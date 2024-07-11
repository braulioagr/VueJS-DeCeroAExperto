import { sleep } from '@/components/helpers/sleep';
import type { ChatMessage } from '@/interfaces/chat-message.interface';
import type { YesNoResponse } from '@/interfaces/yes-no-response.interface';
import { ref } from 'vue';

export const useChat = () => {

  const messages = ref<ChatMessage[]>([]);
  
  const onMessage = async (message: string) => {
    if (message.trim().length <= 0) { return; }

    messages.value.push({
      id: new Date().getTime() +1 , message, itsMine: true
    });

    if(!message.endsWith('?')){ return; }
    console.log({message});

    const {answer, image} = await getHerResponse();

    await sleep(2);

    messages.value.push({
      id: new Date().getTime() +1 ,
      message: answer,
      itsMine: false,
      image: image,
    });

  };
  
  const getHerResponse = async (): Promise<YesNoResponse> => {
    const resp = await fetch('https://yesno.wtf/api');
    const data = (await resp.json()) as YesNoResponse;
    return data;
  }



  return{
    // properties
    messages,

    // methods
    onMessage
  }
}
