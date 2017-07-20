import { observable, action } from 'mobx';

class Notification {
  @observable unreadAtNotificationCnt;
  @observable unreadBroadcastNotificationCnt;
  @observable unreadCommentedNotificationCnt;
  @observable unreadFollowingNotificationCnt;
  @observable unreadNewFollowerNotificationCnt;
  @observable unreadNotificationCnt;
  @observable unreadPointNotificationCnt;
  @observable unreadReplyNotificationCnt;
  @observable unreadSysAnnounceNotificationCnt;

  constructor() {
    this.unreadAtNotificationCnt = 0;
    this.unreadBroadcastNotificationCnt = 0;
    this.unreadCommentedNotificationCnt = 0;
    this.unreadFollowingNotificationCnt = 0;
    this.unreadNewFollowerNotificationCnt = 0;
    this.unreadNotificationCnt = 0;
    this.unreadPointNotificationCnt = 0;
    this.unreadReplyNotificationCnt = 0;
    this.unreadSysAnnounceNotificationCnt = 0;
  }

  @action setCnts = (data) => {
    this.unreadAtNotificationCnt = data.unreadAtNotificationCnt;
    this.unreadBroadcastNotificationCnt = data.unreadBroadcastNotificationCnt;
    this.unreadCommentedNotificationCnt = data.unreadCommentedNotificationCnt;
    this.unreadFollowingNotificationCnt = data.unreadFollowingNotificationCnt;
    this.unreadNewFollowerNotificationCnt = data.unreadNewFollowerNotificationCnt;
    this.unreadNotificationCnt = data.unreadNotificationCnt;
    this.unreadPointNotificationCnt = data.unreadPointNotificationCnt;
    this.unreadReplyNotificationCnt = data.unreadReplyNotificationCnt;
    this.unreadSysAnnounceNotificationCnt = data.unreadSysAnnounceNotificationCnt;
  };
}

const notification = new Notification();
export default notification;
export { Notification };
