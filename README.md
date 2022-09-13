# React Video Trimmer

This project is built using react & node.js to trim video files using the ffmpeg web assembly (wasm) implementation [GitHub](https://github.com/ffmpegwasm/ffmpeg.wasm) to process the video on the client to avoid lengthy processing on a server, files are exported as .mp4 files. Most video types are accepted as an input (.mp4, .mov, .flv, .wmv, .webm). .avi or .flv files do not work.

# Demo

A demo of the app can be found [here](https://react-vid-trim.herokuapp.com/)

# Usage

1. Select a video file for trimming.
2. Adjust start & end sliders to the desired times.
3. Click the trim video button and wait for processing to finish.
4. The processed video is displayed at the bottom of the page to view.
5. The trimmed video can be downloaded using the options in the video player, if desired.

If you would like to run the app locally clone the repo and install the dependencies using by running `npm install` within the directory, then run `node server` and navigate to `localhost:9000`

# Issues Encountered


## SharedArrayBuffer is not defined

Due to the spectre vulnerability being discovered most modern browsers disabled the SharedArrayBuffer feature by default for security, in order to allow access to this feature we must send additional information in the http header in the server response to allow addition Cross Origin Resources to be accessed, in this case the ffmpeg wasm files. This was done in the node.js server.js file, the headers required to be set were: `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` based on the advice [here](https://stackoverflow.com/questions/68592278/sharedarraybuffer-is-not-defined)

## Unable to access createFFmpeg.js

While initially developing the application I ran into an issue with the app being unable to access the required javascript file but found that it is a known issue with using the ffmpeg library with react, this was fixed by downgrading the version being used to `@ffmpeg/ffmpeg v0.9.8` & `@ffmpeg/core v0.9.0` as suggested [here](https://github.com/ffmpegwasm/ffmpeg.wasm/issues/229#issuecomment-881122522)
