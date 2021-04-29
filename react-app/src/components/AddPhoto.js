import Webcam from 'webcam-easy'

const photoPage = () => {
	const addPhoto = () => {
		const webcamElement = document.getElementById('webcam')
		const canvasElement = document.getElementById('canvas')
		const snapSoundElement = document.getElementById('snapSound')
		const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement)
		webcam
			.start()
			.then(result => {

			})
			.catch(err => {

			})
		if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {

		}
		navigator.mediaDevices.getUserMedia({ video: true, audio: false })
		let picture = webcam.snap()
	}

	return (
	
	)
}
