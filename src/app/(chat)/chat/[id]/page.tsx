import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { DEFAULT_MODEL_NAME, models } from '@/src/ai/models';
import { Chat as PreviewChat } from '@/src/components/custom/chat';
import {
  getChatById,
  getMessagesByChatId,
  getSession,
} from '@/src/db/cached-queries';
import { convertToUIMessages } from '@/src/lib/utils';

export default async function Page(props: { params: Promise<any> }) {
  const params = await props.params;
  const { id } = params;
  const chat = await getChatById(id);

  if (!chat) {
    notFound();
  }

  const user = await getSession();

  if (!user) {
    return notFound();
  }

  if (user.id !== chat.user_id) {
    return notFound();
  }

  const messagesFromDb = await getMessagesByChatId(id);

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('model-id')?.value;
  const selectedModelId =
    models.find((model) => model.id === modelIdFromCookie)?.id ||
    DEFAULT_MODEL_NAME;

  console.log(convertToUIMessages(messagesFromDb));

  return (
    <PreviewChat
      id={chat.id}
      initialMessages={convertToUIMessages(messagesFromDb)}
      selectedModelId={selectedModelId}
    />
  );
}
