/**
 * ES6
 * 
 * Calculer le salaire d'une personne sur base de son salaire brut en décomptant les frais suivants: 
 * 
 * • Impôts sur le revenu : 18% 
 * • Assurance employée : 7% 
 * • Régime de pensions du Canada : 5%
 * 
 * Les personnes peuvent recevoir comme supplément un bonus de 100$ ou une allocation de 150$. 
 * 
 * Il est possible de recevoir des réductions sur les impôts sur le revenu sous certaines conditions : 
 * 
 * • Si le travailleur est une femme, elle reçoit 2% de réduction.
 * • Si le travailleur a 3 personnes à charge, il reçoit 1% de réduction.
 * • Si le travailleur a 4 personnes à charge, il reçoit 2% de réduction.
 * 
 */

const readline = require('readline');

let myReadLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const impotRevenu = 18;     // en pourcentage
const assurance = 7;        // en pourcentage
const regimePension = 5;    // en poucentage
const femme = 2;            // en pourcentage
const personneThree = 1;    // en pourcentage
const personneFOur = 2      // en pourcentage

const bonus = 100;          // en dollars
const allocation = 150;     // en dollars

let tmpSalaire;
let tmpSex;
let tmpPersonCharge;
let tmpBonus;




class Person {
    constructor(salaire, sexe, personCharge, typeBonus) {
        this.salaire = salaire
        this.sexe = sexe;
        this.personCharge = personCharge;
        this.typeBonus = typeBonus;
    }

    calculSalaireNet() {
        
        let valeurImpot = impotRevenu;

        if (this.sexe == 'F') {
            valeurImpot -= femme;
        }

        if (this.personCharge == 3) {
            valeurImpot -= personneThree;
        }

        if (this.personCharge >= 4) {
            valeurImpot -= personneFOur;
        }

        //Impôts sur le revenu
        this.calculDuSalaire(valeurImpot);

        //Assurance 
        this.calculDuSalaire(assurance);

        //Regime Pension
        this.calculDuSalaire(regimePension);

        //Si la personne a des bonnus
        this.bonusSalaire();

        return this.salaire;
    }

    calculDuSalaire(pourcentage) {
        this.salaire = this.salaire - (this.salaire * pourcentage / 100);
    }

    bonusSalaire() {
        //type de bonus Bonus
        if (this.typeBonus == 'B') {
            this.salaire += bonus;
        }
        else if (this.typeBonus == 'A') {
            this.salaire += allocation;
        }
    }


}

//------



function saisirSalaire() {
    return new Promise(resolve => {
        myReadLine.question('Saisir un salaire en dollars : ', function (saisie) { // la variable `saisie` contient la saisie effectuée
            resolve(saisie);
        });
    });
}

function saisirSexe() {
    return new Promise(resolve => {
        myReadLine.question('Saisir votre sexe H ou F : ', function (saisie) { // la variable `saisie` contient la saisie effectuée
            resolve(saisie);
        });
    });
}

function saisirPersonCharge() {
    return new Promise(resolve => {
        myReadLine.question('Saisir le nombre de personne a charge :', function (saisie) { // la variable `saisie` contient la saisie effectuée
            resolve(saisie);
        });
    });
}

function saisirBonus() {
    return new Promise(resolve => {
        myReadLine.question(`Saisir le Bonus, Aucun '0', Prime 'B', Allocation 'A' :`, function (saisie) { // la variable `saisie` contient la saisie effectuée
            resolve(saisie);
        });
    });
}


saisirSalaire()
    .then(result => {
        tmpSalaire = result;

        saisirSexe().then(result => {
            tmpSex = result;

            saisirPersonCharge().then(result => {
                tmpPersonCharge = result;

                saisirBonus().then(result => {
                    tmpBonus = result;
    
                    myReadLine.close();
    
                    let person = new Person(tmpSalaire, tmpSex, tmpPersonCharge, tmpBonus);
                    console.log(`Le salaire net est ${person.calculSalaireNet()}`);
                });
            });
        });
    });


