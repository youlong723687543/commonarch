<template>
  <div class="chart"></div>
</template>
<script>
import echarts from "echarts";
import "echarts/theme/macarons"; // echarts theme
import resize from "element-resize-detector";
export default {
  name: "echart_pie",
    props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chat: null,
    };
  },
  methods: {
      initChart() {
      debugger
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
      this.chart.on('updateAxisPointer', event => {
        let xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
          let dimension = xAxisInfo.value + 1;
          this.chart.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}: {@[' + dimension + ']} ({d}%)'
              },
              encode: {
                value: dimension,
                tooltip: dimension
              }
            }
          });
        }
      })
    },
    setOptions({newVisitis} = {}) {
      this.chart.setOption({
        legend: {},
        title: {
          text: newVisitis.title
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        dataset: {
          source: newVisitis.source
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false
          }},
        yAxis: {
          gridIndex: 0,
          axisTick: {
            show: false
          }},
        grid: {
          width: '40%',
          height: '60%',
          left: '5%',
          bottom: 20,
          top: 30,
          containLabel: true},
        series: [
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['70%', '45%'],
            height: '70%',
            left: '50%',
            label: {
              formatter: '{b}: {@2012} ({d}%)'
            },
            encode: {
              itemName: 'product',
              value: '2012',
              tooltip: '2012'
            }
          }
        ]
      })
    },
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
};
</script>
