# VideoJS Ads Marker Plugin
With this plugin you possible to add markers to videojs progress and render some component (HTML) inside videojs when progress hits markers.

# Requirment
- ReactJs version >= 17.0.2
- Video.Js version ^7.18.1

Don't worry. This requirment will auto install if you haven't installed it.


# Install
```
npm i @video-js-plugins/videojs-ads-marker
```

or with yarn
```
yarn add @video-js-plugins/videojs-ads-marker
```

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

# API

## Marker
 **Property**   | **Description**                                                      | **Type**                 | **Default** 
----------------|----------------------------------------------------------------------|--------------------------|-------------
 `time`         | The time at which the marker will be placed. This value in `seconds` | float                    | undefined   
 `render`       | Content to be rendered in the videojs                                | string | react component | undefined   
 `stopOnMarker` | Stop video when progress hits marker                                 | boolean                  | true        
 `marker`       | Show or hide marker on video progress bar to all marker data.        | boolean                  | undefined   
 `payload`      | Any custom data you want to pass through marker                      | object                   | {}          
 
 
 ## Config
 **Property**       | **Description**                                                                | **Type**       | **Default** 
--------------------|--------------------------------------------------------------------------------|----------------|-------------
 `stopOnMarker`     | Stop video when progress hits marker to all marker data.                       | boolean        | true        
 `onDetectedMarker` | Callback when progress hits marker. with one parameter containing marker data. | function(data) | undefined   
 `marker`           | Show or hide marker on video progress bar to all marker data.                  | boolean        | true        
