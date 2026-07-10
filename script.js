// NZXT CAM Web Integration
// CPU + GPU Temperature Only

const cpuTemp = document.getElementById("cpuTemp");
const gpuTemp = document.getElementById("gpuTemp");
const progress = document.getElementById("progress");


// Ring settings
const circumference = 2 * Math.PI * 180;


// Set ring length
progress.style.strokeDasharray = circumference;


// Smooth animation value
let currentTemp = 0;


function animateRing(target){

    const start = currentTemp;
    const duration = 800;
    const startTime = performance.now();


    function update(time){

        const elapsed = time - startTime;
        const progressTime = Math.min(elapsed / duration, 1);


        // smooth easing
        const ease =
            1 - Math.pow(1 - progressTime, 3);


        currentTemp =
            start + (target - start) * ease;


        // Temperature range 0-100C
        const offset =
            circumference -
            (currentTemp / 100) * circumference;


        progress.style.strokeDashoffset = offset;


        if(progressTime < 1){
            requestAnimationFrame(update);
        }

    }


    requestAnimationFrame(update);

}



// NZXT CAM sends monitoring data here

window.nzxt = {

    v1: {

        onMonitoringDataUpdate(data){


            let cpu = 0;
            let gpu = 0;



            // CPU temperature

            if(data.cpus && data.cpus.length){

                cpu =
                data.cpus[0].temperature || 0;

            }



            // GPU temperature

            if(data.gpus && data.gpus.length){

                gpu =
                data.gpus[0].temperature || 0;

            }



            // Update text

            cpuTemp.innerHTML =
                Math.round(cpu) + "°";


            gpuTemp.innerHTML =
                Math.round(gpu) + "°";



            // Update ring using CPU temp

            animateRing(cpu);


        }

    }

};
