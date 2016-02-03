Projet MADERA
===========
# Cordova
## Installation des prérequis système

* Xcode
  - Télécharger Xcode depuis l'AppStore
  - Le lancer une première fois pour finaliser l'installation

* Android SDK
  - Télécharger le package correspondant à la plateforme
  - Exporter la variable ANDROID\_HOME (fichier .bashrc)
  - Ajouter éventuellement ANDROID\_HOME/dossier-sdk au PATH (fichier .bashrc)
  - Installer un JAVA SDK et un JAVA JRE

* cordova cli
```
[sudo] npm install -g cordova
```

* Genymotion
> - Télécharger l'application [ici](https://www.genymotion.com/#!/download)
> - Démarrer l'application et ajouter un terminal virtuel

* Dépôt npm ios-sim
```
npm install ios-sim -g
```

## Initialisation des plateformes

```
cordova platform add ios
cordova platform add android
```


## Installation des plugins Cordova

### Installer un plugin cordova

```
cordova plugin add <plugin> --save
```

> _Le flag __save__ permet_ de référencer le plugin dans le fichier __config.xml__

### Installer tous les plugins référencés dans config.xml

```
cordova prepare
```

## Lancement du projet en développement

* Lancer le projet dans les simulateurs __ios__ et __android__

  - Démarrer le terminal virtuel genymotion
  - Lancer la commande ```cordova run ios android -- --livereload```


  > __Selon la localisation de l'installation du sdk android, il peut être nécessaire de définir la variable d'environnement ANDROID_HOME__

## Troubleshooting :

En cas d'erreur :


```
#!javascript

> Could not resolve all dependencies for configuration ':_debugCompile'.
   > Could not find any version that matches com.android.support:support-v4:+.
     Searched in the following locations:
         https://repo1.maven.org/maven2/com/android/support/support-v4/maven-metadata.xml
         https://repo1.maven.org/maven2/com/android/support/support-v4/
     Required by:
         :android:unspecified

```

Taper ces 2 commandes dans la console :


```
#!javascript
android list sdk
android update sdk --no-ui --filter extra

```

Apparemment, certains plugins cordova nécessitent des extras du SDK Android tels que Android Support Library, Google Play Services, etc.
