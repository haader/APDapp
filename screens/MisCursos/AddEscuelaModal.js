import { React, useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { addMisCursos, fetchMisCursos } from './databaseMisCursos';
import { AntDesign } from '@expo/vector-icons';

export default addEscuelaModal = ({ visible, close }) => {

    const [lunes, setLunes] = useState(false);
    const [martes, setMartes] = useState(false);
    const [miercoles, setMiercoles] = useState(false);
    const [jueves, setJueves] = useState(false);
    const [viernes, setViernes] = useState(false);
    const [sabado, setSabado] = useState(false);

    const [prueba, setPrueba] = useState([{ valor: false }, { valor: false }, { valor: false }, { valor: false }, { valor: false }, { valor: false }])

    //VARIABLES PARA ADDMISCURSOS()
    //const [dia,setDia]=useState('');
    const [establecimiento, setEstablecimiento] = useState('');
    const [materia, setMateria] = useState('');
    const [desde, setDesde] = useState('');
    const [hasta, setHasta] = useState('');

    const [horarios, setHorarios] = useState([
        { horaInicio: 7, minutosInicio: 0, horaFin: 7, minutosFin: 0 },
        { horaInicio: 7, minutosInicio: 0, horaFin: 7, minutosFin: 0 },
        { horaInicio: 7, minutosInicio: 0, horaFin: 7, minutosFin: 0 },
        { horaInicio: 7, minutosInicio: 0, horaFin: 7, minutosFin: 0 },
        { horaInicio: 7, minutosInicio: 0, horaFin: 7, minutosFin: 0 },
        { horaInicio: 7, minutosInicio: 0, horaFin: 7, minutosFin: 0 },
    ]);




    const DiaHorario = ({ dia, boleanDia, AlterarBoleanDia, numero }) => {

        //rangos
        const rangoInicialHora = 7;
        const rangoFinalHora = 23;

        const rangoInicialMinutos = 0;
        const rangoFinalMinutos = 55;


        const [horaInicio, setHoraInicio] = useState(horarios[numero].horaInicio);
        const [minutosInicio, setMinutosInicio] = useState(horarios[numero].minutosInicio);

        const [horaFin, setHoraFin] = useState(horarios[numero].horaFin);
        const [minutosFin, setMinutosFin] = useState(horarios[numero].minutosFin);



        // Hora INICIO      
        const upHourInico = () => {

            if (horaInicio >= rangoInicialHora && horaInicio < rangoFinalHora) {


                //esto no funciona:
                setHoraInicio(prevHoraInicio => prevHoraInicio + 1);
                setHoraFin(prevHoraFin => prevHoraFin + 1);
                //.... porque?

                horarios[numero].horaInicio = horaInicio + 1;
                horarios[numero].horaFin = horaInicio + 1;


            } else {
                setHoraInicio(rangoInicialHora);
                setHoraFin(rangoInicialHora);

                horarios[numero].horaInicio = rangoInicialHora;
                horarios[numero].horaFin = rangoInicialHora;




            }

        }
        const downHourInico = () => {
            if (horaInicio > rangoInicialHora && horaInicio <= rangoFinalHora) {
                setHoraInicio(horaInicio - 1);
                setHoraFin(horaInicio - 1);

                horarios[numero].horaInicio = horaInicio - 1;
                horarios[numero].horaFin = horaInicio - 1;

            } else {
                setHoraInicio(rangoFinalHora);
                setHoraFin(rangoFinalHora);


                horarios[numero].horaInicio = rangoFinalHora;
                horarios[numero].horaFin = rangoFinalHora;




            }
        }
        // Minutos INICIO        
        const upMinInico = () => {
            if (minutosInicio >= rangoInicialMinutos && minutosInicio < rangoFinalMinutos) {
                setMinutosInicio(minutosInicio + 5);
                setMinutosFin(minutosInicio + 5);
                horarios[numero].minutosInicio = minutosInicio + 5;
                horarios[numero].minutosFin = minutosInicio + 5;
            } else {
                setMinutosInicio(rangoInicialMinutos);
                setMinutosFin(rangoInicialMinutos);
                horarios[numero].minutosInicio = rangoInicialMinutos;
                horarios[numero].minutosFin = rangoInicialMinutos;
            }

        }
        const downMinInico = () => {
            if (minutosInicio > rangoInicialMinutos && minutosInicio <= rangoFinalMinutos) {
                setMinutosInicio(minutosInicio - 5);
                setMinutosFin(minutosFin - 5);
                horarios[numero].minutosInicio = minutosFin - 5;
                horarios[numero].minutosFin = minutosFin - 5;
            } else {
                setMinutosInicio(rangoFinalMinutos);
                setMinutosFin(rangoFinalMinutos);
                horarios[numero].minutosInicio = rangoFinalMinutos;
                horarios[numero].minutosFin = rangoFinalMinutos;
            }


        }
        // REMPLAZADO POR LA IA

        // Hora FIN
        const upHourFin = () => {
            if (horaFin >= rangoInicialHora && horaFin < rangoFinalHora) {
                setHoraFin(horaFin + 1);
                horarios[numero].horaFin = horaFin + 1;

            } else {
                setHoraFin(rangoInicialHora);
                horarios[numero].horaFin = rangoInicialHora;
            }
        }

        const downHourFin = () => {
            if (horaFin > rangoInicialHora && horaFin <= rangoFinalHora) {
                setHoraFin(horaFin - 1);
                horarios[numero].horaFin = horaFin - 1;
            } else {
                setHoraFin(rangoFinalHora);
                horarios[numero].horaFin = rangoFinalHora;
            }
        }

        // Minutos FIN
        const upMinFin = () => {
            if (minutosFin >= rangoInicialMinutos && minutosFin < rangoFinalMinutos) {
                setMinutosFin(minutosFin + 5);
                horarios[numero].minutosFin = minutosFin + 5;
            } else {
                setMinutosFin(rangoInicialMinutos);
                horarios[numero].minutosFin = rangoInicialMinutos;
            }
        }

        const downMinFin = () => {
            if (minutosFin > rangoInicialMinutos && minutosFin <= rangoFinalMinutos) {
                setMinutosFin(minutosFin - 5);
                horarios[numero].minutosFin = minutosFin - 5;
            } else {
                setMinutosFin(rangoFinalMinutos);
                horarios[numero].minutosFin = rangoFinalMinutos;
            }
        }


        let textColor = boleanDia ? { color: 'black' } : { color: 'gray' }

        return (
            <View style={[styles.column, { alignItems: 'center', margin: 5 }]}>
                <TouchableOpacity style={[styles.btnDia, boleanDia ? styles.btnDiaTrue : styles.btnDiaFalse]} onPress={() => { boleanDia ? AlterarBoleanDia(false) : AlterarBoleanDia(true) }} >
                    <Text style={boleanDia ? { color: 'white' } : { color: 'gray' }}>{dia}</Text>
                </TouchableOpacity>

                {/* seleccionar horarios */}
                {boleanDia && <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>


                    {/* HORA INICIO */}
                    <View style={[styles.column, [boleanDia ? { backgroundColor: 'orange' } : { backgroundColor: 'white' }], { borderRadius: 10, padding: 5, margin: 5, borderWidth: 1 }]}>

                        <Text style={[{ textAlign: 'center' }, textColor]}>Inicio</Text>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>

                            <View style={[styles.column, { justifyContent: 'center', alignItems: 'center' }]}>
                                {/* SUBIR HORA */}
                                <TouchableOpacity style={styles.btnChangeHora} onPress={() => { upHourInico() }} >
                                    <AntDesign name="upcircleo" size={24} color={boleanDia ? "black" : 'gray'} />
                                </TouchableOpacity>

                                <Text style={[styles.Hora, textColor]}>{horaInicio}</Text>
                                {/* BAJAR HORA */}
                                <TouchableOpacity style={styles.btnChangeHora} onPress={() => { downHourInico() }} >
                                    <AntDesign name="downcircleo" size={24} color={boleanDia ? "black" : 'gray'} />
                                </TouchableOpacity>

                            </View>

                            <Text style={styles.Hora}>:</Text>

                            <View style={[styles.column, { justifyContent: 'center', alignItems: 'center' }]}>
                                {/* SUBIR MINUTOS */}
                                <TouchableOpacity style={styles.btnChangeHora} onPress={() => { upMinInico() }} >
                                    <AntDesign name="upcircleo" size={24} color={boleanDia ? "black" : 'gray'} />
                                </TouchableOpacity>

                                <Text style={[styles.Hora, textColor]}>{minutosInicio}</Text>

                                {/* BAJAR MINUTOS */}
                                <TouchableOpacity style={styles.btnChangeHora} onPress={() => { downMinInico() }} >
                                    <AntDesign name="downcircleo" size={24} color={boleanDia ? "black" : 'gray'} />
                                </TouchableOpacity>

                            </View>
                            <Text style={[styles.Hora, textColor]}>hs</Text>

                        </View>

                    </View>
                    {/* HORA FIN */}
                    <View style={[styles.column, [boleanDia ? { backgroundColor: 'orange' } : { backgroundColor: 'white' }], { borderRadius: 10, padding: 5, margin: 5, borderWidth: 1 }]}>

                        <Text style={[{ textAlign: 'center' }, textColor]}>Fin</Text>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>

                            <View style={[styles.column, { justifyContent: 'center', alignItems: 'center' }]}>
                                {/* SUBIR HORA */}
                                <TouchableOpacity style={styles.btnChangeHora} onPress={() => { upHourFin() }} >
                                    <AntDesign name="upcircleo" size={24} color={boleanDia ? "black" : 'gray'} />
                                </TouchableOpacity>

                                <Text style={[styles.Hora, textColor]}>{horaFin}</Text>
                                {/* BAJAR HORA */}
                                <TouchableOpacity style={styles.btnChangeHora} onPress={() => { downHourFin() }} >
                                    <AntDesign name="downcircleo" size={24} color={boleanDia ? "black" : 'gray'} />
                                </TouchableOpacity>

                            </View>
                            <Text style={styles.Hora}>:</Text>

                            <View style={[styles.column, { justifyContent: 'center', alignItems: 'center' }]}>
                                {/* SUBIR MINUTOS */}
                                <TouchableOpacity style={styles.btnChangeHora} onPress={() => { upMinFin() }} >
                                    <AntDesign name="upcircleo" size={24} color={boleanDia ? "black" : 'gray'} />
                                </TouchableOpacity>

                                <Text style={[styles.Hora, textColor]}>{minutosFin}</Text>

                                {/* BAJAR MINUTOS */}
                                <TouchableOpacity style={styles.btnChangeHora} onPress={() => { downMinFin() }} >
                                    <AntDesign name="downcircleo" size={24} color={boleanDia ? "black" : 'gray'} />
                                </TouchableOpacity>

                            </View>
                            <Text style={[styles.Hora, textColor]}>hs</Text>
                        </View>

                    </View>


                </View>
                }

            </View>
        )
    }

    const SelectDiaHorario = () => {


        return (
            <View style={styles.column}>

                <View style={styles.row}>

                    <ScrollView horizontal={true} style={{ borderRadius: 10, borderWidth: 1, padding: 10, margin: 10 }}>

                        <DiaHorario dia={'Lunes'} boleanDia={lunes} AlterarBoleanDia={setLunes} numero={0} />
                        <DiaHorario dia={'Martes'} boleanDia={martes} AlterarBoleanDia={setMartes} numero={1} />
                        <DiaHorario dia={'Miercoles'} boleanDia={miercoles} AlterarBoleanDia={setMiercoles} numero={2} />
                        <DiaHorario dia={'Jueves'} boleanDia={jueves} AlterarBoleanDia={setJueves} numero={3} />
                        <DiaHorario dia={'Viernes'} boleanDia={viernes} AlterarBoleanDia={setViernes} numero={4} />
                        <DiaHorario dia={'Sabado'} boleanDia={sabado} AlterarBoleanDia={setSabado} numero={5} />
                        {/* <DiaHorario dia={'Jueves'} />
                    <DiaHorario dia={'Viernes'} />
                    <DiaHorario dia={'Sabado'} /> */}

                    </ScrollView>



                </View>
                <View>

                </View>
            </View>

        )
    }

    const [listToken,setListToken]=useState();
    const generateToken = (callback) => {
        
        // Genera un número aleatorio entre 0 y 9999
        const randomNumber = Math.floor(Math.random() * 10000);
      
        // Formatea el número como un token de 4 dígitos (agrega ceros a la izquierda si es necesario)
        const tokenGenerado = randomNumber.toString().padStart(4, '0');

        // Comprobar si el token generado está en la lista de tokens existentes
        if (listToken.includes(parseInt(tokenGenerado))) {
            return callback(callback);

        } else {
            
            let newListToken=listToken.push(tokenGenerado);
            setListToken(newListToken);

            return tokenGenerado;

        }

      };

    const guardar = () => {

        //generate token de 4 digitos
        let token = generateToken(generateToken());

        //commprovamos si el token existe en la lista de tokens
        

        if ((lunes === false && martes === false && miercoles === false && jueves === false && viernes === false && sabado === false) || establecimiento === '' || materia === '' || desde === '' || hasta === '') {

            Alert.alert('Error', 'debe completar todos los campos', [{ text: 'ok', onPress: () => { } }])

        } else {

            lunes ? addMisCursos(token, 'Lunes', horarios[0].horaInicio, horarios[0].minutosInicio, horarios[0].horaFin, horarios[0].minutosFin, establecimiento, materia, desde, hasta) : null;
            martes ? addMisCursos(token, 'Martes', horarios[1].horaInicio, horarios[1].minutosInicio, horarios[1].horaFin, horarios[1].minutosFin, establecimiento, materia, desde, hasta) : null;
            miercoles ? addMisCursos(token, 'Miercoles', horarios[2].horaInicio, horarios[2].minutosInicio, horarios[2].horaFin, horarios[2].minutosFin, establecimiento, materia, desde, hasta) : null;
            jueves ? addMisCursos(token, 'Jueves', horarios[3].horaInicio, horarios[3].minutosInicio, horarios[3].horaFin, horarios[3].minutosFin, establecimiento, materia, desde, hasta) : null;
            viernes ? addMisCursos(token, 'Viernes', horarios[4].horaInicio, horarios[4].minutosInicio, horarios[4].horaFin, horarios[4].minutosFin, establecimiento, materia, desde, hasta) : null;
            sabado ? addMisCursos(token, 'Sabado', horarios[5].horaInicio, horarios[5].minutosInicio, horarios[5].horaFin, horarios[5].minutosFin, establecimiento, materia, desde, hasta) : null;

            console.log(lunes, martes, miercoles, jueves, viernes, sabado)
            close();
        }



    }

    return (

        <Modal
            visible={visible}
            onRequestClose={close}
            animationType="slide" // Puedes personalizar el tipo de animación
            transparent={true}
        >
            <View style={{ borderWidth: 1, borderRadius: 10, padding: 10, margin: 10 }}>

                <Text style={styles.title}>Agregar un nuevo curso</Text>

                {/* ESCUELAS */}
                <View style={styles.row}>
                    <TextInput style={styles.input} value={establecimiento} onChangeText={(tx) => { setEstablecimiento(tx) }} placeholder='Escuela' />
                    <TouchableOpacity style={styles.btnDelete} onPress={() => { }} >
                        <AntDesign name='close' color={'black'} size={10} />
                    </TouchableOpacity>
                </View>

                {/* MATERIA/CARGO */}
                <View style={styles.row}>
                    <TextInput style={styles.input} value={materia} onChangeText={(tx) => { setMateria(tx) }} placeholder='Materia/ Cargo' />
                    <TouchableOpacity style={styles.btnDelete} onPress={() => { }} >
                        <AntDesign name='close' color={'black'} size={10} />
                    </TouchableOpacity>
                </View>

                {/* SELECCIONAR DIA Y HORARIO */}
                <SelectDiaHorario />

                {/* DESDE*/}
                <View style={styles.row}>
                    <TextInput style={styles.input} value={desde} onChangeText={(tx) => { setDesde(tx) }} placeholder='DESDE: dd/mm/aaaa' />
                    <TouchableOpacity style={styles.btnDelete} onPress={() => { }} >
                        <AntDesign name='close' color={'black'} size={10} />
                    </TouchableOpacity>
                </View>

                {/* HASTA*/}
                <View style={styles.row}>
                    <TextInput style={styles.input} value={hasta} onChangeText={(tx) => { setHasta(tx) }} placeholder='HASTA: dd/mm/aaaa' />
                    <TouchableOpacity style={styles.btnDelete} onPress={() => { }} >
                        <AntDesign name='close' color={'black'} size={10} />

                    </TouchableOpacity>
                </View>

                <View style={[styles.row, { justifyContent: 'center', alignContent: 'center' }]}>

                    <TouchableOpacity style={styles.btn} onPress={() => { close() }} >
                        <AntDesign name='close' color={'black'} size={20} />
                        <Text>Cerrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={() => {
                        guardar()
                    }}>
                        <AntDesign name='save' color={'black'} size={20} />
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.btn} onPress={() => {
                        fetchMisCursos((datos) => { console.log(datos) });
                    }}>
                        <AntDesign name='close' color={'black'} size={20} />
                        <Text>Traer datos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={() => {
                        console.warn("-Horarios: ")
                        console.log("--", horarios[0])
                        console.log("--", horarios[1])
                        console.log("--", horarios[2])
                        console.log("--", horarios[3])
                        console.log("--", horarios[4])
                        console.log("--", horarios[5])
                        console.warn("-Boleanos: ");
                        console.warn(prueba)

                    }}>
                        <AntDesign name='close' color={'black'} size={20} />
                        <Text>Horarios</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    btn: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,

    },
    btnDia: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: '100%',
        alignItems: 'center',
        borderColor: 'gray',
        color: 'gray'
    },
    btnDiaTrue: {
        backgroundColor: 'orange',
        borderColor: 'black',
        color: 'white'
    },
    btnDiaFalse: {
        backgroundColor: 'white',
        borderColor: 'gray',
        color: 'gray'
    },
    btnChangeHora: {

    },
    Hora: {

    },
    btnDelete: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        backgroundColor: 'red',

    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        width: '80%',
        margin: 5
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    }
})