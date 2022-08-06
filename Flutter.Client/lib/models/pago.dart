import 'dart:html';

class Pago {
  int idPago;
  DateTime fecha;
  int concepto;
  Blob comprobanteDePago;
  int idTutor;
  int idAlumno;
  int cantidad;
  String formatoComprobante;

  Pago(
    this.idPago,
    this.fecha,
    this.concepto,
    this.comprobanteDePago,
    this.idTutor,
    this.idAlumno,
    this.cantidad,
    this.formatoComprobante,
  );

  factory Pago.fromJson(Map<String, dynamic> json) {
    return Pago(
      json['idPago'],
      json['fecha'],
      json['concepto'],
      json['comprobanteDePago'],
      json['idTutor'],
      json['idAlumno'],
      json['cantidad'],
      json['formatoComprobante'],
    );
  }
}
