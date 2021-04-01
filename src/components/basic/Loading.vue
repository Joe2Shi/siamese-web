<template>
  <div id="loading" class="loading active hide">
    <span class="bar"/>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hidden () {
      document.getElementById('loading').classList.add('hide')
    },
    show () {
      document.getElementById('loading').classList.remove('hide')
    }
  },
  watch: {
    'loading' (newValue) {
      if (newValue) this.show()
      else this.hidden()
    }
  }
}
</script>

<style scoped>
  #loading {
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 7;
  }

  @-webkit-keyframes moving-bar {
    0% {
      right: 50%;
      left: 50%
    }
    99.9% {
      right: 0;
      left: 0
    }
    100% {
      right: 50%;
      left: 50%
    }
  }

  @-moz-keyframes moving-bar {
    0% {
      right: 50%;
      left: 50%
    }
    99.9% {
      right: 0;
      left: 0
    }
    100% {
      right: 50%;
      left: 50%
    }
  }

  @keyframes moving-bar {
    0% {
      right: 50%;
      left: 50%
    }
    99.9% {
      right: 0;
      left: 0
    }
    100% {
      right: 50%;
      left: 50%
    }
  }

  @-webkit-keyframes change-bar {
    0% {
      background-color: #23b7e5
    }
    33.3% {
      background-color: #23b7e5
    }
    33.33% {
      background-color: #fad733
    }
    66.6% {
      background-color: #fad733
    }
    66.66% {
      background-color: #7266ba
    }
    99.9% {
      background-color: #7266ba
    }
  }

  @-moz-keyframes change-bar {
    0% {
      background-color: #23b7e5
    }
    33.3% {
      background-color: #23b7e5
    }
    33.33% {
      background-color: #fad733
    }
    66.6% {
      background-color: #fad733
    }
    66.66% {
      background-color: #7266ba
    }
    99.9% {
      background-color: #7266ba
    }
  }

  @keyframes change-bar {
    0% {
      background-color: #23b7e5
    }
    33.3% {
      background-color: #23b7e5
    }
    33.33% {
      background-color: #fad733
    }
    66.6% {
      background-color: #fad733
    }
    66.66% {
      background-color: #7266ba
    }
    99.9% {
      background-color: #7266ba
    }
  }

  @-webkit-keyframes slideInRight {
    0% {
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
      visibility: visible
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0)
    }
  }

  @keyframes slideInRight {
    0% {
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
      visibility: visible
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0)
    }
  }

  @-webkit-keyframes fadeInUp {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0)
    }
    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none
    }
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0)
    }
    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none
    }
  }

  @-webkit-keyframes slideOutRight {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0)
    }
    100% {
      visibility: hidden;
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0)
    }
  }

  @keyframes slideOutRight {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0)
    }
    100% {
      visibility: hidden;
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0)
    }
  }

  .loading {
    position: relative;
    height: 2px;
  }

  .loading .bar {
    position: absolute;
    width: 100%;
    height: 0;
    text-indent: -9999px;
    background-color: #23b7e5
  }

  .loading .bar:before {
    position: absolute;
    right: 50%;
    left: 50%;
    height: 2px;
    background-color: inherit;
    content: ""
  }

  .loading.active {
    -webkit-animation: change-bar 2.25s infinite .75s;
    -moz-animation: change-bar 2.25s infinite .75s;
    animation: change-bar 2.25s infinite .75s
  }

  .loading.active .bar {
    -webkit-animation: change-bar 2.25s infinite;
    -moz-animation: change-bar 2.25s infinite;
    animation: change-bar 2.25s infinite
  }

  .loading.active .bar:before {
    -webkit-animation: moving-bar .75s infinite;
    -moz-animation: moving-bar .75s infinite;
    animation: moving-bar .75s infinite
  }

  .hide {
    display: none;
  }
</style>
