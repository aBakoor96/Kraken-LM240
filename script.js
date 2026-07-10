window.nzxt = {


v1:{


onMonitoringDataUpdate:function(data){


let cpu="--";
let gpu="--";



if(data.cpus && data.cpus.length){

cpu=Math.round(
data.cpus[0].temperature
);

}



if(data.gpus && data.gpus.length){

gpu=Math.round(
data.gpus[0].temperature
);

}



document
.getElementById("cpuTemp")
.innerHTML=cpu;



document
.getElementById("gpuTemp")
.innerHTML=gpu;



}



}



};
