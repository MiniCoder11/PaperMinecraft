var blockAtlas = document.createElement('canvas');
myCanvas.offscreenCanvas.width = myCanvas.width;
myCanvas.offscreenCanvas.height = myCanvas.height;

myCanvas.getContext('2d').drawImage(myCanvas.offScreenCanvas, 0, 0);

export {beep};