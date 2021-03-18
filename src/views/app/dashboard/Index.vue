<template>
  <v-card flat tile class="dashboard" min-height="748">
    <div v-if="chart">
      <apexchart type="line" :options="lineOptions" :series="lineSeries" height="320"/>
    </div>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Dashboard',
  data: () => ({
    chart: false,
    lineOptions: {},
    lightLineOptions: {
      chart: {
        fontFamily: 'inherit',
        foreColor: '',
        animations: {
          easing: 'easein'
        },
        toolbar: {
          show: false,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
            customIcons: []
          }
        }
      },
      tooltip: {
        style: {
          fontSize: '12px'
        },
        theme: 'light'
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      legend: {
        position: 'top'
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      }
    },
    darkLineOptions: {
      chart: {
        fontFamily: 'inherit',
        foreColor: '#BDBDBD',
        animations: {
          easing: 'easein'
        },
        toolbar: {
          show: false,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
            customIcons: []
          }
        }
      },
      tooltip: {
        style: {
          fontSize: '12px'
        },
        theme: 'dark'
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      legend: {
        position: 'top'
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      }
    },
    lineSeries: [
      {
        name: 'Count',
        data: [55, 62, 120, 66, 98, 72, 101, 75, 94, 120, 117, 139]
      },
      {
        name: 'Sum',
        data: [40, 80, 89, 50, 100, 80, 120, 65, 50, 82, 120, 150]
      },
      {
        name: 'Avg',
        data: [150, 127, 100, 89, 95, 80, 64, 65, 50, 30, 12, 1]
      }
    ],
    verify: false
  }),
  mounted () {
    this.chart = true
    this.switchChartsTheme()
  },
  methods: {
    switchChartsTheme: function () {
      if (this.$vuetify.theme.dark) this.lineOptions = this.darkLineOptions
      else this.lineOptions = this.lightLineOptions
    },
    ...mapActions(['showSnackbar'])
  },
  watch: {
    'theme' () {
      this.switchChartsTheme()
    }
  },
  computed: {
    ...mapState(['theme'])
  }
}
</script>
