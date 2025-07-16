    // 🔧 Configuration Firebase (ton propre projet)
    const firebaseConfig = {
      apiKey: "AIzaSyCaGtL4Oj6b2k20_oetgH1ywX-KH494gXo",
      authDomain: "lmarket-abonne.firebaseapp.com",
      databaseURL: "https://lmarket-abonne-default-rtdb.firebaseio.com",
      projectId: "lmarket-abonne",
      storageBucket: "lmarket-abonne.firebasestorage.app",
      messagingSenderId: "663525186269",
      appId: "1:663525186269:web:38b02a180efab5dec69934"
    };

    // 🔌 Initialisation
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    // 👤 ID utilisateur simulé (tu peux remplacer par un vrai système d’authentification)
    const userId = localStorage.getItem("userId") || generateRandomId();
    localStorage.setItem("userId", userId);

    function generateRandomId() {
      return 'user_' + Math.random().toString(36).substr(2, 9);
    }

    const followBtn = document.getElementById('follow-btn');
    const followersCount = document.getElementById('followers-count');
    const followersRef = db.ref("followers");

    // 🔍 Vérifie si l’utilisateur est déjà abonné
    followersRef.child(userId).once('value', snapshot => {
      if (snapshot.exists()) {
        followBtn.textContent = "Suivi(e)";
        followBtn.classList.add("suivi");
      } else {
        followBtn.textContent = "Suivre ➕";
        followBtn.classList.remove("suivi");
      }
    });

    // 🔢 Compteur d’abonnés
    followersRef.on('value', snapshot => {
      const count = snapshot.numChildren();
      followersCount.textContent = `${count} abonné${count > 1 ? 's' : ''}`;
    });

    // 🔁 Gère le clic sur le bouton
    followBtn.addEventListener('click', () => {
      followersRef.child(userId).once('value', snapshot => {
        if (snapshot.exists()) {
          // ❌ Se désabonner
          followersRef.child(userId).remove();
          followBtn.textContent = "Suivre ➕";
          followBtn.classList.remove("suivi");
        } else {
          // ✅ S’abonner
          followersRef.child(userId).set(true);
          followBtn.textContent = "Suivi(e)";
          followBtn.classList.add("suivi");
        }
      });
    });

