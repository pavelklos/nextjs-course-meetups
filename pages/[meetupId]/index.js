import { useRouter } from "next/router";
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  const router = useRouter();
  const meetupId = router.query?.meetupId;

  return (
    <Fragment>
      <p className='created'>
        created: <b>{props.created}</b> : {props.function} <b>{props.type}</b>
      </p>
      <MeetupDetail
        // image='https://images.pexels.com/photos/2598010/pexels-photo-2598010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        // title='This is a first meetup'
        // address='Meetupstreet 5, 12345 Meetup City'
        // description='This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!'
        // id='m1'
        image={props.meetup.image}
        title={props.meetup.title}
        address={props.meetup.address}
        description={props.meetup.description}
        id={props.meetup.id}
      />
    </Fragment>
  );
};

export async function getStaticProps(context) {
  // console.log(context); // WE CAN WORK WIT CONTEXT (PARAMS)
  const params = context.params;
  const meetupId = params.meetupId;
  // console.log(params);

  // fetch data for single item from API
  // connect file system, database, ... (SAFE FOR CREDENTIALS)

  return {
    props: {
      meetup: {
        image:
          "https://images.pexels.com/photos/2598010/pexels-photo-2598010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        title: "This is a first meetup",
        address: "Meetupstreet 5, 12345 Meetup City",
        description:
          "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!",
        // id: "m1",
        id: meetupId,
      },
      created: new Date().toLocaleString(),
      type: "[DYNAMIC SSG]",
      function: "getStaticProps() + getStaticPaths()", // + revalidate
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { meetupId: "m1" } },
      { params: { meetupId: "m2" } },
      { params: { meetupId: "m3" } },
    ],
    fallback: false, // false, true, 'blocking'
  };
}

export default MeetupDetails;
