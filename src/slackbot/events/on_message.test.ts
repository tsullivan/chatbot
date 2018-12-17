import { Bot } from '../../lib';
import { onMessageFactory } from './on_message';

// mocks
const bot = new Bot();
bot.setSlackChannel('CUTC234A');
bot.setSlackBotId('B345ISJ38');

const rtm = { sendMessage: () => Promise.resolve(true) };

describe('Slackbot / RTM / On Message', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not reply to not mention', async () => {
    const sendMsgSpy = jest.spyOn(rtm, 'sendMessage');

    // @ts-ignore
    const onMessage = onMessageFactory(bot, rtm);
    const event = {
      channel: bot.getSlackChannel(),
      text: `Test message with nothing interesting for the day`,
      user: 'U123TSTTSTTS',
    };

    expect(sendMsgSpy).not.toHaveBeenCalled();
    await onMessage(event);
    expect(sendMsgSpy).not.toHaveBeenCalled();
  });

  it.skip('should reply to mention', async () => {
    const sendMsgSpy = jest.spyOn(rtm, 'sendMessage');

    // @ts-ignore
    const onMessage = onMessageFactory(bot, rtm);
    const event = {
      channel: bot.getSlackChannel(),
      text: `Test message to ${bot.getSlackBotId()} for the day`,
      user: 'U123TSTTSTTS',
    };

    expect(sendMsgSpy).not.toHaveBeenCalled();
    await onMessage(event);
    expect(sendMsgSpy).toHaveBeenCalledTimes(1);
    expect(sendMsgSpy).lastCalledWith(
      `My brain hurts!!! I think I just lost all of my memory!!!
 What is your name?`,
      'CUTC234A'
    );
  });

  it.skip('should reply to direct message', async () => {
    const sendMsgSpy = jest.spyOn(rtm, 'sendMessage');

    // @ts-ignore
    const onMessage = onMessageFactory(bot, rtm);
    const event = {
      channel: 'DPGYRT3485',
      text: `Test message, bot`,
      user: 'U123TSTTSTTS',
    };

    expect(sendMsgSpy).not.toHaveBeenCalled();
    await onMessage(event);
    expect(sendMsgSpy).toHaveBeenCalledTimes(1);
    expect(sendMsgSpy).lastCalledWith(
      `My brain hurts!!! I think I just lost all of my memory!!!
 What is your name?`,
      'DPGYRT3485'
    );
  });
});
