import Swalert from '@components/Swalert'

export default {
  title: 'Components/Swalert',
  component: Swalert,
}

export const Default = () => {
  const handleRemove = () => {
    console.log('remove')
  }

  return <button onClick={() => Swalert(handleRemove)}>CLICK</button>
}
