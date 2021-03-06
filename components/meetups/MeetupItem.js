import { useRouter } from "next/router";
import Image from "next/image";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";

function MeetupItem(props) {
  const router = useRouter();

  function showDetailsHandler() {
    // router.replace(`/${props.id}`);
    router.push(`/${props.id}`);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          {/* <img src={props.image} alt={props.title} /> */}
          <Image
            src={props.image}
            alt={props.title}
            width={640}
            height={320}
            // layout='fixed'
            // layout='intrinsic'
            layout='responsive'
          />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
          <h5>{props.id}</h5>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
