Projet MADERA
===========
# Initialisation du projet (Cordova)

### NodeJS
* Si vous n'avez pas nodeJs d'installé sur votre poste : https://nodejs.org/en/
* Sinon mettez le à jour : ``` npm update -g npm ```

### Installation des prérequis système
* Xcode
  - Télécharger Xcode depuis l'AppStore
  - Le lancer une première fois pour finaliser l'installation

* Android SDK
  - Télécharger la dernière version JDK de java : http://www.oracle.com/technetwork/java/javase/downloads/index.html
  - Télécharger Android Studio : http://developer.android.com/sdk/index.html
  - Ajouter la variable d'environnement "ANDROID_HOME"

#### Mac OS X
```
export ANDROID_HOME=/<installation location>/android-sdk-macosx
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

#### Linux
```
export ANDROID_HOME=/<installation location>/android-sdk-linux
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

#### Windows
```
set ANDROID_HOME=C:\<installation location>\android-sdk-windows
set PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools
```
 - Une fois la variable d'environnement ajoutée vérifiez la dans la console en tapant : android (le SDK Manager s'ouvre)
 - Dans le SDK Manager vérifiez que les modules suivant sont bien installés : 
#### Tools
- Dernière version Android SDK Tools
- Dernière version Android SDK Platform-Tools
- Dernière version Android SDK Build-Tools
#### Tools (Preview channel)
- Android SDK Tools
#### Android (dernière version)
- Tous les modules
#### Extras
- Android Support Repository
- Android Support Library
- Google Play Services
- Google Repository
- Google USB Driver
- Google Web Driver

### Installation de Cordova Cli
```
[sudo] npm install -g cordova
```
ou mettre à jour si vous l'avez déjà
```
[sudo] npm update -g cordova
```

#### Dépôt npm ios-sim
```
npm install ios-sim -g
```

### Genymotion (Emulation mobile)
> - Télécharger l'application [ici](https://www.genymotion.com/#!/download)
> - Démarrer l'application et ajouter un terminal virtuel

### Création du projet
```
cordova create hello com.example.hello HelloWorld
> - hello : représente le nom du répertoire créé pour le projet
> - com.example.hello : (optionnel) fournit au projet un nom de domaine de style inverse
> - HelloWorld : représente le nom/titre de l'application
```

### Initialisation des plateformes
```
cordova platform add ios
cordova platform add android
```

### Installation des plugins Cordova

#### Installer un plugin cordova
```
cordova plugin add <plugin> --save
```

#### Installer tous les plugins référencés dans config.xml

```
cordova prepare
```

### Lancement du projet en développement

* Lancer le projet dans les simulateurs __ios__ et __android__

  - Démarrer le terminal virtuel genymotion
  - Lancer la commande ```cordova run ios android -- --livereload```
