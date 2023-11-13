


export default function Title(props: { value: string | undefined }) {
  if (props.value === undefined || props.value == "") {
    return (
      <>
        <title>An another developer</title>
      </>
    );
  } else {
    return (
      <>
        <title>{props.value}</title>
      </>
    );
  }
}
