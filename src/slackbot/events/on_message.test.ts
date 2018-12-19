import { RTMClient } from '@slack/client';
import { Bot } from '../../lib';
import { onMessageFactory } from './on_message';

// mocks
const bot = new Bot();
bot.setSlackChannel('CUTC234A');
bot.setSlackBotId('B345ISJ38');

const rtm = new RTMClient('test 123');
jest
  .spyOn(rtm, 'sendMessage')
  .mockImplementation(() => Promise.resolve('send message test complete'));
jest.spyOn(rtm, 'start').mockImplementation(() => Promise.resolve(true));

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

  it('should reply to mention', async () => {
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
  });

  it('should reply to direct message', async () => {
    const sendMsgSpy = jest.spyOn(rtm, 'sendMessage');

    // @ts-ignore
    const onMessage = onMessageFactory(bot, rtm);
    const events = [
      {
        channel: 'DPGYRT3485',
        text: `Test message, bot`,
        user: 'U123TSTT',
      },
      {
        channel: 'DPGYRT3485',
        text: `Thor`,
        user: 'U123TSTT',
      },
    ];

    expect(sendMsgSpy).not.toHaveBeenCalled();

    await onMessage(events[0]);
    expect(sendMsgSpy).toHaveBeenCalledTimes(1);
    expect(sendMsgSpy).lastCalledWith(
      `I think your name is ${events[0].user}. What is it really?`,
      events[0].channel
    );

    await onMessage(events[1]);
    expect(sendMsgSpy).toHaveBeenCalledTimes(2);
    expect(sendMsgSpy).lastCalledWith(
      `Hello, ${events[1].text}! Nice to meet you.`,
      events[1].channel
    );
  });
});