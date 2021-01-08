# vue-lottie

Lottie component for VueJS

## Properties
- **renderer**: type: `String`  default: `'canvas'`
- **loop**: type: `Boolean`, default: `true`
- **autoplay**: type: `Boolean`, default: `true`
- **animation-data**: type: `Object` or `String`, default: `''`
- **src**: type: `String`, default: `''`

## Methods

- `isPlaying(): boolean` 
- `play()` 
- `pause()` 
- `togglePause()`
- `replay()`
- `stop()`
- `goToAndStop(value: number, isFrame = false)` 
- `goToAndPlay(value: number, isFrame = false)` 
- `setDirection(direction: -1 or 1)` 
- `setSubframe(useSubFrames = true)` 
- `setSpeed(speed = 1)` 
- `getDuration(inFrames = false): number`
- `playSegments(segments: array, forceFlag)` 
- `mute()` 
- `unmute()` 
- `setVolume(val)` 
- `getVolume(): number` 
- `show()`
- `hide()`
- `destroy()`

## Events

- complete
- loop-complete
- enter-frame
- segment-start
- instance

## Example

```vue
<vue-lottie src="https://assets3.lottiefiles.com/private_files/lf30_lqefghep.json" :autoplay="true" :loop="true" />
```

### todo

*Finish readme :smile:*
