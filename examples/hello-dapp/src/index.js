document.getElementById('fetchAccountAddress').onclick = function () {
  document.getElementById('accountAddress').innerText = "some_address";
};

document.getElementById('sendManifestToExtension').onclick = function () {
  const manifest = document.getElementById('manifest').value;

  document.getElementById('receipt').innerText = manifest;
};

document.getElementById('fetchComponentState').onclick = function () {
  const componentAddress = document.getElementById('componentAddress').value;
  document.getElementById('componentState').innerText = componentAddress;
};