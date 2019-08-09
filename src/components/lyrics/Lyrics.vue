<template lang='pug'>
  #DynamicLyric
    #layer(ref="layer")
      p(
        v-for="(lyric, i) in currentLyric.lyrics"
        v-if="i>=3"
        :class="i===9 ? 'highLight' : ''"
      )
        | {{ lyric.text }}
</template>

<script>
// import Lyric from 'lyric-parser'
import lrc2json from 'lrc2json'
import txt from '@/assets/lyrics/Perfect.txt'

export default {
  name: 'Lyrics',
  data () {
    return {
      currentLyric: null,
      currentLineNum: 0
    }
  },
  methods: {
    initData () {
      let lrcJSON = lrc2json(txt)
      console.log(lrcJSON)
      this.currentLyric = lrcJSON
      // this.currentLyric = new Lyric(lrcJSON, this.handleLyric)
      
      console.log(this.currentLyric)    },
    handleLyric () {
      const ly = this.$refs.layer
      console.log()
      ly.style.transition = 'bottom 2000s'
      setInterval(() => {
        console.log(ly.style.bottom)
        ly.style.bottom = (ly.style.bottom + 10) + 'px'
      }, 1000)
    }
  },
  created () {
    this.initData()
  },
  mounted () {
    this.handleLyric()
  }
}
</script>

<style lang='sass'>
  $grey: #f5f5f5
  $orange: #ff6c00
  $green: #3cb06e
  #DynamicLyric
    height: 85%
    overflow: hidden
    padding-top: 20px
    .highLight
      color: $orange
    #layer
      position: relative
</style>
