// let oscillators = [];
// let isPlaying = [];
// let intervals = [];
// //Función para que el oscilador suene como un metrónomo.
// function startMetronome() {
//   for (let i = 0; i <= ITERACIONES; i++) {
//     let osc = new p5.Oscillator();
//     osc.setType('sine');
//     osc.freq(200 * i);
//     osc.amp(0.5);
//     oscillators.push(osc);
//     isPlaying.push(false);
//   }
//   //Hacer que suenen como metrónomo
//   for (let i = 0; i <= ITERACIONES; i++) {
//     let interval = setInterval(function () {
//       if (isPlaying[i]) {
//         oscillators[i].stop();
//         isPlaying[i] = false;
//       } else {
//         oscillators[i].start();
//         isPlaying[i] = true;
//       }
//     }, floor(1000 / (i + 1))); //El i-ésimo oscilador sonará cada 1/(i+1) segundos.
//   }
// }
function CreateMetronome(iteraciones = 1) {
  CreateOscillators(iteraciones);
  CreateIntervals(iteraciones);
}
let oscillators = [];
function CreateOscillators(iteraciones = 1) {
  ClearOscillators();

  for (let index = 0; index < iteraciones; index++) {
    let osc = new p5.Oscillator();
    osc.setType('sine');
    osc.freq(200 * (index + 1));
    osc.amp(0.5 * 1 / (index + 1));
    oscillators.push([osc, false]);
  }
  // console.log("Osciladores creados");
}
function ClearOscillators() {
  if (oscillators.length > 0) {
    for (let osc of oscillators) {
      osc[0].stop();
    }
    oscillators = [];
  }
  // console.log("Lista de osciladores limpia");
}
let intervals = [];
function CreateIntervals(iteraciones = 1) {
  ClearIntervals();
  for (let index = 0; index < iteraciones; index++) {
    let interval = setInterval(() => PlayInterval(index), floor(1000 / (index + 1)));
    intervals.push(interval);
  }
  // console.log("Intervalos creados");
}
function PlayInterval(index) {
  if (oscillators[index][1]) {
    oscillators[index][0].stop();
    oscillators[index][1] = false;
  } else {
    oscillators[index][0].start();
    oscillators[index][1] = true;
  }
  // console.log("Suena oscilador:" + oscillators[index]);
}
function ClearIntervals() {
  if (intervals.length > 0) {
    for (let interval of intervals) {
      clearInterval(interval);
    }
    intervals = [];
  }
  // console.log("Lista de intervalos limpia");
}
