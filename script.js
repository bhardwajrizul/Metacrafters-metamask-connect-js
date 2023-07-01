function connectWallet() {
    console.log("Connection Started");
    if (window.ethereum && window.ethereum.isMetaMask) {
        console.log('MetaMask Found!');

        window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
				getAccountBalance(result[0]);
			})
            .catch(err => {
                document.getElementById('error').innerText = err.message;
                console.log(err);
            })
    }
}

function accountChangedHandler(newAccount) {
    document.getElementById('address').innerText = newAccount;
}

function getAccountBalance(account) {
    window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			document.getElementById('balance').innerText = (ethers.utils.formatEther(balance));
		})
		.catch(err => {
			error = err.message;
            console.log(err);
    });
}

function setConnButtonText(updatedText) {
    document.getElementById('button').disabled = true;
    document.getElementById('button').innerText = updatedText;
}

const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    document.getElementById('button').disabled = false;
    window.location.reload();
}

window.ethereum.on('accountsChanged', accountChangedHandler);
window.ethereum.on('chainChanged', chainChangedHandler);