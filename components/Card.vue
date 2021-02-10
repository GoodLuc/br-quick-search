<template>
  <article class="card shade flex mb-md">
    <figure class="card__avatar">
      <img :src="user.avatar" :alt="user.name+', '+user.title">
    </figure>
    <div class="flex vertical flex vertical w100">
      <div class="card__info">
        <header class="flex justify-between">
          <h3 class="card__info__name" v-html="userData('name')"></h3>
          <span class="card__info__email" v-html="niceEmail"></span>
        </header>
        <h4 class="card__info__title" v-html="userData('title')"></h4>
        <address class="card__info__address"><span v-html="userData('address')"></span>, <span v-html="userData('city')"></span></address>
      </div>
      <hr>
      <button class="card__info__mark">Mark as suitable</button>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    user: { type: Object, required: true },
    highlight: { type: String, required: false }
  },
  computed: {
    userData: function() {
      return function(dataName) {
        if (this.highlight.length > 1) {
          return this.user[dataName].replace(new RegExp(this.highlight, "gi"), match => { return '<mark>' + match + '</mark>';
          });
        } else {
          return this.user[dataName]
        }
      }
    },
    niceEmail: function() {
      let email = this.user.email
      if (this.highlight.length > 1) {
        email = email.replace(new RegExp(this.highlight, "gi"), match => { return '<mark>' + match + '</mark>';
        });
      } 
      return email.split("@").join("@<wbr>").split(".").join("<wbr>.");
    }
  }
}
</script>

<style lang="scss">
.card {
  animation: 1s appear;
  width: 650px; padding: 0;

  &__avatar {
    border-radius: 3px 0 0 3px;
    margin: 0;
    background: rgba($color: #000000, $alpha: .2);
    width: 180px;
    height: 100%;
    flex-shrink: 0;
    img { display: block; }
  }
  &__info {
    padding: 1em 2em .4em;
    font-size: 14px;
    margin-bottom: 1.4em;
    &__name { 
      color: rgba(0, 0, 0, 0.87);
      font-size: 24px;
      margin: 0 1em 0 0;
    }
    &__email {
      text-align: right;
      color: rgba(0, 0, 0, 0.54); 
      margin: 2px 0 0 auto;
      overflow-wrap: break-word;
      word-wrap: break-word;
    }
    &__title { 
      font-size: 14px; 
      color: rgba(0, 0, 0, 0.5438); 
      font-weight: 700; 
      margin: 5px 0;
    }
    &__address { color: rgba(0, 0, 0, 0.5438); font-style: normal; }
    &__mark { 
      cursor: pointer;
      text-transform: uppercase; 
      font-weight: 600; font-size: 14px;
      color: rgba(0, 150, 136, 1); 
      border: none;
      width: 100%;
      border-top: 1px solid rgba(0, 0, 0, 0.12);
      background: none; padding: 1em 2em;
      text-align: left; margin: auto;
    }
  }
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
