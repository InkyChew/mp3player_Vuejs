<template lang='pug'>
  .container-fluid
    .row
      #Main.col-lg-6.col-md-12
        .imgMask
          img(src="@/assets/image/Ed Sheeran.jpg")
        h1.title Ed Sheeran
        .row.d-flex.align-items-end
          .col-6.d-flex.flex-column
            label.follow FOLLOWERS
            label.followNum {{ followers }}
          .col-6
            button.btn.btn-follow.mx-2(
              type='button'
              @click="follower"
              :class="{ focus:isFollow }"
            ) FOLLOW
            button.btn.btn-play.mx-2(type='button') PLAY
      .col-lg-6.col-md-12
        .d-flex.flex-column
          h3 Top Songs
          .card(v-for="music in musicList")
            .card-body.d-flex.justify-content-between
              h6 {{ music.id }}
              //- .albumMask.align-self-start.text-center
              img.albumMask(src="@/assets/image/divide.png")
              .col-7
                h6 {{ music.name }}
              .col-2
                h6 {{ music.duration }}
              a(
                href="javascript:;"
                @click="jumplayer(music.id)"
              )
                i.fas.fa-play
        #newRelease
          h3 New Release
          .row.newRelease.mx-0
            .col-3.px-0
             img.img-fluid(src="@/assets/image/new release.jpg")
            .col-9.text-center.my-auto
              h4 No.6 Collaborations Project
              h6 2019.07.12
        #Albums
          h3 Recent Albums
          .row
            .col-4.d-flex.flex-column
              img.albumImg(src="@/assets/image/divide.png")
              h5 Divide
              label 2017
            .col-4.d-flex.flex-column
              img.albumImg(src="@/assets/image/multiply.png")
              h5 Multiply
              label 2014
            .col-4.d-flex.flex-column
              img.albumImg(src="@/assets/image/plus.png")
              h5 Plus
              label 2011
      #playerCompo(v-if="isPlay")
        player(:key="getNowMusic")
</template>

<script>
import player from '@/components/player'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    player
  },
  data () {
    return {
      isPlay: false,
      isFollow: false,
      followers: 5790,
      musicList: [
        {
          id: 1,
          name: 'Happier',
          duration: '3:35',
          src: require('@/assets/music/Happier.mp3')
        },
        {
          id: 2,
          name: 'Perfect',
          duration: '4:39',
          src: require('@/assets/music/Perfect.mp3')
        },
        {
          id: 3,
          name: 'Shape Of You',
          duration: '3:55',
          src: require('@/assets/music/Shape Of You.mp3')
        },
        {
          id: 4,
          name: 'Castle On The Hill',
          duration: '4:20',
          src: require('@/assets/music/Castle On The Hill.mp3')
        },
        {
          id: 5,
          name: 'Dive',
          duration: '3:58',
          src: require('@/assets/music/Dive.mp3')
        },
        {
          id: 6,
          name: 'How Would You Feel (Paean)',
          duration: '4:40',
          src: require('@/assets/music/How Would You Feel (Paean).mp3')
        }
      ]
    }
  },
  computed: {
    ...mapGetters({ // rerender component 的 key
      getNowMusic: 'getNowMusic'
    })
  },
  methods: {
    ...mapActions({
      setNowMusic: 'setNowMusic'
    }),
    follower () {
      if (!this.isFollow) {
        this.followers += 1
        this.isFollow = true
      } else {
        this.followers -= 1
        this.isFollow = false
      }
    },
    jumplayer (id) {
      this.render += 1
      this.isPlay = true
      this.setNowMusic(id)
    }
  }
}
</script>

<style lang='sass'>
  $grey: #f5f5f5
  $orange: #ff6c00
  $green: #3cb06e
  .container-fluid
    background-color: $grey
    padding: 50px 70px
  .imgMask
    overflow: hidden
    max-width: 640px
  .title
    font-weight: bold
    font-size: 70px
    text-decoration-line: underline
    text-decoration-style: solid
  .follow
  .followNum
    font-size: 32px
    font-weight: bold
  .btn-follow
    background-color: $grey
    color: black
    border: solid 1px
    &:hover
      background-color: $green
      color: white
  .focus
    background-color: $green
    color: white
  .btn-play
    background-color: $orange
    color: white
    &:hover
      background-color: $grey
      color: $orange
      border: solid 1px
  .card
    border: none
  .card-body
    padding: 10px
    background-color: $grey
    border-bottom: 1px solid rgba(0, 0, 0, 0.25)
    a
      color: black
      &:hover
        color: $orange
    .albumMask
      width: 30px
      height: 30px
      // overflow: hidden
  #newRelease
    padding-top: 30px
    .newRelease
      background-color: white
  #Albums
    padding-top: 30px
    .albumImg
      max-width: 80%
      height: auto
  h3
    padding-bottom: 10px

  #playerCompo
    width: 57%
    position: fixed
    bottom: 0
    right: 0
</style>
