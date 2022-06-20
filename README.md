# VideoJS Ads Marker Plugin
With this plugin you possible to add markers to videojs progress and render some component (HTML) inside videojs when progress hits markers.

# Requirment
- ReactJs version >= 17.0.2
- Video.Js version ^7.18.1
Don't worry. This requirment will auto install if you haven't installed it.

# Quick Use
```
import '@video-js-plugins/videojs-ads-markers'

const MyComponent = () => {
    return (
        <div className="my-component">
            <h1>Render Component Here</h1>
        </div>
    )
}

const markerData = [
    {
        time: '20',
        render: <MyComponent/>
    },
    {
        time: '30',
    }
]

player.adsMarker(markerData)

```
