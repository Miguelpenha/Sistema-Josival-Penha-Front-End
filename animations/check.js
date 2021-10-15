import Lottie from 'react-lottie'
import checkIcon from '../assets/animations/check.json'

export default function CheckAnimation() {
    return <Lottie options={{
        loop: false,
        autoplay: true,
        animationData: checkIcon,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }} width={40} height={40} isStopped={false} isPaused={false}/>
}