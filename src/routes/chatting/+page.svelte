<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type { Socket } from "socket.io-client";
  import MessageForm from "$lib/components/message/MessageForm.svelte";
  import Messages from "$lib/components/message/Messages.svelte";
  import ChatUserList from "$lib/components/chat-user/ChatUserList.svelte";

  export let socket : Socket;
  let messages: any[];

  // onMount(() => {
  //   socket = io("http://localhost:3001");
  // });

  // onMount(() => {
  //   if (!socket) return;
  //   socket.once("load-messages", (data) => {
  //     console.log(data);

  //     messages = data;
  //   });
  //   socket.emit("get-messages");
  // });

  // onDestroy(() => {
  //   if (socket) {
  //     socket.disconnect();
  //   }
  // });

  // onMount(()=> {
  //   if(!socket) return;
  //   socket.on('message-receive', (data) => {
  //     messages = [...messages, data];
  //   })
  // })

</script>

<div class="h-full w-full flex justify-center mt-5 py-5 gap-x-10">
 <ChatUserList />
  <div class="w-2/3 shadow-md flex flex-col">
    <h3 class="text-center py-5">Let's chat</h3>
    <Messages {messages}/>
    <div class="mt-auto w-full">
      <MessageForm {socket}/>
    </div>
  </div>
</div>
