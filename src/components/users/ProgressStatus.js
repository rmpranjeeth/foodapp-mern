import ProgressBar from 'react-bootstrap/ProgressBar';

function StackedExample() {
  const now = 60;
  return <ProgressBar animated striped now={now} label={`${now}%`} />;
}

export default StackedExample;

