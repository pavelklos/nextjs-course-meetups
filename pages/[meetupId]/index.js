import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = () => {
  const router = useRouter();
  const meetupId = router.query?.meetupId;

  return (
    <MeetupDetail
      image='https://images.pexels.com/photos/2598010/pexels-photo-2598010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
      title='This is a first meetup'
      address='Meetupstreet 5, 12345 Meetup City'
      description='This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!'
      id='m1'
    />
  );
};

export default MeetupDetails;
