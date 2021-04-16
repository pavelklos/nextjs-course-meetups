import { useRouter } from "next/router";

const MeetupDetail = () => {
  const router = useRouter();
  const meetupId = router.query?.meetupId;

  return <h1>MEETUP DETAIL : {meetupId}</h1>;
};

export default MeetupDetail;
