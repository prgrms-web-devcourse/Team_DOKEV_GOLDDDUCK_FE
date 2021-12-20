import ErrorAlert from '@components/Swalert/ErrorAlert'

export default {
  title: 'Components/ErrorAlert',
  component: ErrorAlert,
}

export const Default = () => {
  return <button onClick={() => ErrorAlert('error')}>CLICK</button>
}
