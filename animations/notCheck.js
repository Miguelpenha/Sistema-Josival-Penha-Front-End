import Lottie from 'react-lottie'
import notCheckIcon from '../assets/animations/notCheck.json'

export default function NotCheckAnimation() {
    return <Lottie options={{
        loop: false,
        autoplay: true,
        animationData: notCheckIcon,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }} width={40} height={40} isStopped={false} isPaused={false}/>
}