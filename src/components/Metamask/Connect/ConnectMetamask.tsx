import {observer} from 'mobx-react-lite';
import React from 'react';

import {useMetamask} from 'src/hooks/metamask.hook';

import metamask_icon from '../../../assets/images/metamask.png';
import {MetamaskWrap, MetamaskText, MetamaskButton} from './metamask.styles';

export const ConnectMetamask = observer(() => {
	const {connectMetamask, walletIdShrunk, metamaskIsConnected} = useMetamask();

	return metamaskIsConnected() ? (
		<MetamaskWrap>
			<img src={metamask_icon} alt="Metamask wallet id" className="top-links__mmicon" width={20} />
			<MetamaskText>{walletIdShrunk}</MetamaskText>
		</MetamaskWrap>
	) : (
		<MetamaskButton onClick={() => connectMetamask()} className="metamask-button">
			<img src={metamask_icon} alt="Metamask wallet id" className="top-links__mmicon" width={20} />
			<MetamaskText>Connect</MetamaskText>
		</MetamaskButton>
	);
});
