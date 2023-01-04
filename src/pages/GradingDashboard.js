import React, {useEffect, useState} from "react";
import { faUser, faLaptop, faLevelUpAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card } from '@themesberg/react-bootstrap';

import { CounterWidget } from "../components/Widgets";
import { getCookie, statuses } from "../utilities/Cookies";
import { POST } from "../utilities/Requests";

let status = getCookie('status');

function welcomeMessage() {
	if (status === statuses[1]) {
		return <>
		<h4>Welcome, you are signed-in as a DTU Student</h4>
		</>
		// Add Here View Grades Button
		// Maybe Add Some Sort of Chart / Progress Circle
	}
	if (status === statuses[2]) {
		return <>
		<h4>Welcome, you are signed-in as a DTU Staff Member</h4>
		</>
		// Add Here Edit Grades Button
		// Maybe Add Some Sort of Chart / Progress Circle
	}
	return <>
	<h4>Please Login with a DTU Account to Continue</h4>
	</>
}

async function getTotalGrades() {
	try {
		return await POST({}, 'totalGradesCount');
	}
	catch (error) {
		return '--';
	}
}

const GradesInSystem = () => {
	const [token, setToken] = useState('--');
	useEffect(() => {
		async function getToken() {
			const token = await getTotalGrades();
			setToken(token);
		}
		getToken();
	}, []);
	return token
}

let Props = () => {
		return (
			<>
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
				</div>

				<center><div className="flex-wrap flex-md-nowrap align-items-center py-4">
					{welcomeMessage()}
				</div></center>

				<Row className="justify-content-md-center">
					<Col xs={12} sm={6} xl={3} className="mb-4">
						<CounterWidget
							category="Students"
							title="10,500"
							icon={faLaptop}
							iconColor="shape-secondary"
							subtitle="2022"
						/>
					</Col>

					<Col xs={12} sm={6} xl={3} className="mb-4">
						<CounterWidget
							category="Academical Staff"
							title="350"
							icon={faUser}
							iconColor="shape-tertiary"
							subtitle="2022"
						/>
					</Col>
					<Col xs={12} sm={6} xl={3} className="mb-4">
						<CounterWidget
								category="Total Grades"
								title={GradesInSystem()}
								icon={faLevelUpAlt}
								iconColor="shape-tertiary"
								subtitle="Now"
							/>
					</Col>
				</Row>
				<Row className="justify-content-md-center">
				<Col xs={12} sm={6} xl={4} className="mb-12"><center>
				<Card border="light" className="shadow-sm">
      				<Card.Body>
					<h5>DTU College Map</h5>
				{/* <img width="400" height="300" src="#"> */}
				</Card.Body>
				</Card>
				</center></Col>
				</Row>
			</>
		);
	};

export default Props