# Deprecation

> This repository was an experiment of mine to create a javascript simulator
> for a simple MIPS CPU. It was quite fun to do, but not viable to get a real
> working and nicely displayed machine.
> I leave this code here for anyone to take a look, but please don't directly
> use it, if you want to discuss, please get in touch with me ;)

## SingleClockJSMips

Genau das, was der Titel sagt: Eine ein(zel) Takt MIPS-ähnliche CPU mit Javascript realisiert - damit das auch im Browser spielen kann.

## Komponenten

Die Clock ist dafür zuständig, alle getakteten-Operationen auszuführen. Dafür ruft sie die exec()-Methode aller registrierten Komponenten auf.
