import { renderToString } from "react-dom/server";
import videojs from "video.js";

function initOverlayWrapper(player, configs) {
    let overlayEl = videojs.dom.createEl('div', {
        className: 'vjs-ovelay-marker',
        innerHTML: `<span class="vjs-overlay-marker-close">Close</span><div id="vjs-overlay-marker-box"></div>`,
    });
        overlayEl.style.position = 'absolute';
        overlayEl.style.top      = 0;
        overlayEl.style.left     = 0;
        overlayEl.style.display  = 'none';
        overlayEl.style.width  = '100%';
        overlayEl.style.height  = '100%';
    
    let closeBtn = overlayEl.querySelector('.vjs-overlay-marker-close');
        const style = {
            float: 'right',
            right: 0,
            bottom: '27px',
            fontSize: '12px',
            background: 'rgb(183 183 183 / 49%)',
            padding: '14px 28px',
            position: 'absolute',
            cursor: 'pointer'
        }
        Object.assign(closeBtn.style, style, configs.styles.closeButton);

        closeBtn.addEventListener('click', () => {
            overlayEl.querySelector('#vjs-overlay-marker-box').innerHTML = "";
            overlayEl.style.display = 'none';
            player.play();
        })

    player.el().appendChild(overlayEl)
}

function registerMarker(player, markers, configs) {

    markers.forEach((marker) => {
        let markerEl = videojs.dom.createEl('div', {
            className: 'vjs-marker',
            innerHTML: "<div class='vjs-marker-point'></div>",
        });
    
        const addMarkerIndicator = () => {
            const markerStyle = {
                width      : '5px',
                height     : '100%',
                background : '#e5c80',
                position   : 'absolute'
            }
            Object.assign(markerEl.style, markerStyle, configs.styles.marker);
        }

        if (marker?.marker === undefined) {
           configs?.marker && addMarkerIndicator();
        } else {
            marker?.marker && addMarkerIndicator(); 
        }
        markerEl.style.left = ((parseFloat(marker.time) / player.duration()) * 100)+"%";
        player.el().querySelector('.vjs-progress-holder').appendChild(markerEl);
    })
}

let timer = 0;
function onTimeUpdate(player, markers, configs) {
    const {
        stopOnMarker, // boolean
        onDetectedMarker, // function
    } = configs

    markers.map((marker) => {
        const currentTime   = (player.currentTime()).toFixed();
        const possitionTime = parseInt(marker.time).toFixed();
        if (possitionTime == currentTime ){
            if(timer == currentTime) return ;
            
            if (!!marker?.render) {
                const overlayChildEl = typeof(marker.render) == 'object'
                ? renderToString(marker.render)
                        : marker.render;
                    
                let overlayMarkerEl = player.el().querySelector('.vjs-ovelay-marker')
                    overlayMarkerEl.style.display = 'block'

                let overlayBoxEl = overlayMarkerEl.querySelector('#vjs-overlay-marker-box')
                    overlayBoxEl.style.padding = '8px';
                    overlayBoxEl.style.overflowY = 'scroll';
                    overlayBoxEl.style.height = '100%';
                    overlayBoxEl.style.background = '#FFFFFF';
                    overlayBoxEl.style.zIndex = 2;
                    overlayBoxEl.innerHTML = overlayChildEl;
            }

            if(marker?.stopOnMarker === undefined) {
                stopOnMarker && player.pause()
            } else {
                marker?.stopOnMarker && player.pause()
            }

            if (typeof(onDetectedMarker) == 'function') {
                onDetectedMarker(marker);
            }
            timer = currentTime;
        }
    })
}

function configsMapper(data) {
    return {
        stopOnMarker: data?.stopOnMarker ?? true, // boolean
        onDetectedMarker: data?.onDetectedMarker ?? undefined, // function || undefined
        marker: data?.marker ?? true, // boolean || undefined
        styles: {
            closeButton: data?.styles?.closeButton ?? {}, // object
            marker: data?.styles?.marker ?? {} // object
        }
    }
}

function markerMapper(data) {
    return {
        duration: data?.duration ?? 0, // seconds
        render: data?.render ?? undefined, //component || html string || undefined
        time: data?.time ?? 0, // seconds
        stopOnMarker: data?.stopOnMarker ?? true, // boolean
        marker: data?.marker ?? undefined, // boolean
        payload: data?.payload ?? {}
    }
}

function adsMarkerPlugin (markers, configs) {

    const markersMap = markers.map(markerMapper);
    const configsMap = configsMapper(configs);

    this.on('canplay', function() {
        initOverlayWrapper(this, configsMap)
        registerMarker(this, markersMap, configsMap)
    });

    this.on('timeupdate', function(){
        onTimeUpdate(this, markersMap, configsMap)
    });
}

const AdsMarker = () => {
    videojs.registerPlugin("adsMarker", adsMarkerPlugin);
}
AdsMarker()

export default AdsMarker;