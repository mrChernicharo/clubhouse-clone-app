import Attendee from './attendee.js';

export default class Room {
  constructor({ id, topic, attendeesCount, speakersCount, featuredattendees, owner, users }) {
    this.id = id;
    this.topic = topic;
    this.attendeesCount = attendeesCount;
    this.speakersCount = speakersCount;
    this.featuredattendees = featuredattendees?.map((attendee) => new Attendee(attendee ));
    this.owner = new Attendee({ owner });
    this.users = users;
  }
}
