import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = () => {
  return (
    <Fragment>
      <MeetupList meetups={DUMMY_DATA} />
    </Fragment>
  );
};

export default HomePage;

const DUMMY_DATA = [
  {
    id: "m1",
    title: "This is a first meetup",
    image:
      "https://images.pexels.com/photos/2598010/pexels-photo-2598010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    address: "Meetupstreet 5, 12345 Meetup City",
    description:
      "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!",
  },
  {
    id: "m2",
    title: "This is a second meetup",
    image:
      "https://images.pexels.com/photos/2734406/pexels-photo-2734406.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    address: "Meetupstreet 5, 12345 Meetup City",
    description:
      "This is a second, amazing meetup which you definitely should not miss. It will be a lot of fun!",
  },
  ,
  {
    id: "m3",
    title: "This is a third meetup",
    image:
      "https://images.pexels.com/photos/815880/pexels-photo-815880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    address: "Meetupstreet 5, 12345 Meetup City",
    description:
      "This is a third, amazing meetup which you definitely should not miss. It will be a lot of fun!",
  },
];
