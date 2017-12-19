$(function(){

var myChart1 = echarts.init(document.getElementById('charts1')); 
var option1 = {
    tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
    },
    // toolbox: {
    //     show : true,
    //     y:"center",
    //     x:"right",
    //     orient: 'vertical', 
    //     feature : {
    //         mark : {show: true},
    //         restore : {show: true},
    //         saveAsImage : {show: true}
    //     }
    // },
    series : [
        {
            name:'实验室',
            type:'gauge',
            splitNumber: 5,       // 分割段数，默认为5
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.2, '#228b22'],[0.8, '#48b'],[1, '#ff4500']], 
                    width: 8
                }
            },
            axisTick: {            // 坐标轴小标记
                splitNumber: 5,   // 每份split细分多少段
                length :12,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto'
                }
            },
            splitLine: {           // 分隔线
                show: true,        // 默认显示，属性show控制显示与否
                length :10,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            pointer : {
                width : 5
            },
            title : {
                show : true,
                offsetCenter: [0, '-40%'],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder'
                }
            },
            detail : {
                formatter:'{value}%',
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto',
                    fontSize:15,
                    fontWeight: 'bolder'
                }
            },
            data:[{value: 50, name: '当前使用率'}]
        }
    ]
};


// timeTicket = setInterval(function (){
    option1.series[0].data[0].value =48;
    myChart1.setOption(option1,true);
// },2000)
//   clearInterval(timeTicket);   

  var myChart2 = echarts.init(document.getElementById('charts2')); 
  var option2 = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'left',
        y : 'top',
        data:['物理实验室','化学实验室','生物实验室']
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true, 
                type: ['pie', 'funnel']
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'实验室预约排行',
            type:'pie',
            radius : [20, 110],
            // center : ['25%', 200],
            roseType : 'radius',
            width: '30%',       // for funnel
            max: 10,            // for funnel
            itemStyle : {
                normal : {
                    label : {
                        show : false
                    },
                    labelLine : {
                        show : false
                    }
                },
                emphasis : {
                    label : {
                        show : true
                    },
                    labelLine : {
                        show : true
                    }
                }
            },
            data:[
                {value:35, name:'物理实验室'},
                {value:25, name:'化学实验室'},
                {value:40, name:'生物实验室'}
            ]
        },
    ]
};
                    
    // option2.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
    myChart2.setOption(option2,true);

})