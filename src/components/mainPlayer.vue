<template lang='pug'>
  div
    template(
      v-for="music in musicList"
      v-if="music.id === nowMusic"
    )
      audio(
        @timeupdate="progress"
        @loadedmetadata="displayTime(0)"
        :src="music.src"
      )
    #lyricScreen.text-center
      .song
        h1 {{ musicList[nowMusic-1].name }}
        label Divide
        h4 Ed Sheeran
      Lyrics
    #player.d-flex.justify-content
      img(src="@/assets/image/divide.png")
      //- | {{ dumin }} : {{ dusec }}
      //- | {{ curmin }} : {{ cursec }}
      #right.col.px-0.d-flex.flex-column
        .music.mx-4.mt-auto.mb-2.d-flex.justify-content-between
          #info.col
            h4 {{ musicList[nowMusic-1].name }}
            label Ed Sheeran
          #control.col.my-auto.d-flex.justify-content-between
            .row.mx-auto
              i.fas.fa-random.mx-4.my-auto(
                v-if="!isRadom"
                @click="random"
              )
              i.fas.fa-random.mx-4.my-auto.active(
                v-if="isRadom"
                @click="random"
              )
              i.fas.fa-step-backward.mx-4.my-auto(@click="prev")
              i.playNpause.fas.fa-pause-circle.fa-2x.mx-4.my-auto(
                v-if="isPlay"
                @click="pause"
              )
              i.playNpause.fas.fa-play-circle.fa-2x.mx-4.my-auto(
                v-if="!isPlay"
                @click="play"
              )
              i.fas.fa-step-forward.mx-4.my-auto(@click="next")
              i.fas.fa-retweet.mx-4.my-auto(
                v-if="!isRedo"
                @click="redo"
              )
              i.fas.fa-retweet.mx-4.my-auto.active(
                v-if="isRedo"
                @click="redo"
              )
          #vol.col.d-flex.justify-content-end
            i.fas.fa-volume-down.mx-2.my-auto(v-if="!isMuted")
            i.fas.fa-volume-mute.mx-2.my-auto(v-if="isMuted")
            .vol-bar.my-auto(ref="volBar" @click="changeVol" @wheel="wheelControlVol")
              .vol(ref="volume")
            i.fas.fa-expand-arrows-alt.mx-2.my-auto
        .progress(ref="progress")
          .bufferTime(ref="bufBar")
            .currentTime(ref="curBar")
</template>

<script>
import Lyrics from '@/components/lyrics/Lyrics.vue'

export default {
  name: 'player',
  components: {
    Lyrics
  },
  data () {
    return {
      isPlay: false,
      isRedo: false,
      isRadom: false,
      isMuted: false,
      nowMusic: 1,
      curmin: 0,
      cursec: 0,
      dumin: 0,
      dusec: 0,
      musicList: [
        {
          id: 1,
          name: 'Happier',
          src: require('@/assets/music/Happier.mp3')
        },
        {
          id: 2,
          name: 'Perfect',
          src: require('@/assets/music/Perfect.mp3')
        },
        {
          id: 3,
          name: 'Shape Of You',
          src: require('@/assets/music/Shape Of You.mp3')
        },
        {
          id: 4,
          name: 'Castle On The Hill',
          src: require('@/assets/music/Castle On The Hill.mp3')
        },
        {
          id: 5,
          name: 'Dive',
          src: require('@/assets/music/Dive.mp3')
        },
        {
          id: 6,
          name: 'How Would You Feel (Paean)',
          src: require('@/assets/music/How Would You Feel (Paean).mp3')
        }
      ]
    }
  },
  methods: {
    end () {
      if (this.isRadom) {
        const endMusic = this.nowMusic
        this.nowMusic = Math.floor((Math.random() * this.musicList.length) + 1)
        if (endMusic === this.nowMusic) {
          this.nowMusic += 1
        }
        console.log(this.nowMusic)
      } else {
        this.next()
      }
    },
    play () {
      document.querySelector('audio').play()
      document.querySelector('audio').addEventListener('ended', this.end)
      this.isPlay = true
    },
    pause () {
      document.querySelector('audio').pause()
      this.isPlay = false
    },
    prev () {
      if (this.nowMusic === 1) {
        this.nowMusic = this.musicList.length
      } else {
        this.nowMusic -= 1
      }
      document.querySelector('audio').setAttribute('autoplay', 'autoplay')
      this.isPlay = true
      // if end then next
    },
    next () {
      if (this.nowMusic === this.musicList.length) {
        this.nowMusic = 1
      } else {
        this.nowMusic += 1
      }
      console.log(this.nowMusic)
      document.querySelector('audio').setAttribute('autoplay', 'autoplay')
      this.isPlay = true
      // if end then next
    },
    random () {
      this.isRadom = !this.isRadom
      if (this.isRadom) {
        document.querySelector('audio').setAttribute('autoplay', 'autoplay')
        console.log(this.nowMusic)
      }
    },
    redo () {
      this.isRedo = !this.isRedo
      if (this.isRedo) {
        document.querySelector('audio').setAttribute('loop', 'loop')
        console.log('loop' + this.isRedo)
      } else {
        document.querySelector('audio').removeAttribute('loop')
        console.log('nonloop' + this.isRedo)
      }
    },
    progress () {
      const audio = document.querySelector('audio')
      const duration = audio.duration
      const currentTime = audio.currentTime
      const bufferTime = audio.buffered
      const progressWidth = this.$refs.progress.offsetWidth

      this.$refs.curBar.style.width = (currentTime / duration) * 100 + '%'
      console.log(currentTime / duration, progressWidth)
      // this.$refs.curBar.style.transition = 'all 1s'
      if (bufferTime.length > 0) {
        this.$refs.bufBar.style.width = (bufferTime.end(0) / duration) * 100 + '%'
        this.$refs.bufBar.style.transition = 'all 3s ease-out'

        this.$refs.bufBar.addEventListener('click', function (e) {
          let changeTime = (e.offsetX / progressWidth) * duration
          audio.currentTime = changeTime
          console.log(changeTime)
        })
      }
      this.displayTime(currentTime)
    },
    displayTime (currentTime) {
      const audio = document.querySelector('audio')
      const duration = audio.duration

      this.dumin = Math.floor(duration / 60)
      this.dusec = Math.floor(duration % 60)

      this.curmin = Math.floor(currentTime / 60)
      this.cursec = Math.floor(currentTime % 60)
      if (this.cursec < 10) {
        this.cursec = '0' + this.cursec
      }
    },
    changeVol (e) {
      const audio = document.querySelector('audio')
      const volBarWidth = this.$refs.volBar.offsetWidth
      let changeVolume = Math.ceil((e.offsetX / volBarWidth) * 10) / 10
      audio.volume = changeVolume
      this.$refs.volume.style.width = (audio.volume) * 100 + '%'
      if (audio.volume === 0) {
        this.isMuted = true
      }
      console.log(changeVolume)
      console.log(audio.volume)
    },
    wheelControlVol (e) {
      console.log('deltay' + e.deltaY)
      const audio = document.querySelector('audio')
      if (e.deltaY < 0 && audio.volume < 0.9) {
        audio.volume += 0.1
        console.log(audio.volume)
      } else if (e.deltaY > 0 && audio.volume > 0) {
        audio.volume = audio.volume.toPrecision(3) - 0.1
        console.log(audio.volume)
      } else if (audio.volume === 0) {
        this.isMuted = true
      }
      this.$refs.volume.style.width = (audio.volume) * 100 + '%'
    }
  }
}
</script>

<style lang='sass'>
  $grey: #f5f5f5
  $orange: #ff6c00
  $green: #3cb06e
  #lyricScreen
    color: white
    background-color: black
    height: 88vh
  #player
    height: 110px
    color: white
    img
      max-height: 100%
    background-color: black
    .progress
      background-color: #4d4d4d
    .vol-bar
      width: 50%
      height: 10px
      background-color: #4d4d4d
      .vol
        background-color: white
        width: 100%
        height: 100%
  i
    &.active
      color: $orange
      font-size: 20px
  .currentTime
    background-color: $orange
    height: 100%
  .bufferTime
    background-color: $green
</style>
