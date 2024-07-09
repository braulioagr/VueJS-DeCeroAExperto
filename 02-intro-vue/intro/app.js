
const { createApp, ref } = Vue
const app = createApp({
  // template: `
  //   <h1>{{message}}</h1>
  //   <p> - {{author}}</p>
  // `,
  setup(){
    const message = ref("I'm batman");
    const author = ref("Bruce Wayne");
    // setTimeout(() => {
    //   message.value = "Hola, soy Goku";
    //   author.value = "Goku";
    // },1500)

    const changeQuote = () => {
      message.value = "Hola, soy Goku";
      author.value = "Goku";
    }

    return {
      message,
      author,
      changeQuote
    };
  }
});

app.mount('#myApp');