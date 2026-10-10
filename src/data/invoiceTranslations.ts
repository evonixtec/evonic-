export type SupportedInvoiceLanguage = 'en' | 'nl' | 'fr' | 'de' | 'es' | 'it' | 'ar' | 'ur';

export interface LanguageMeta {
  code: SupportedInvoiceLanguage;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
  regionBadge: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr', regionBadge: 'Global Standard' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', dir: 'ltr', regionBadge: 'Netherlands & Belgium' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr', regionBadge: 'France & Europe' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr', regionBadge: 'Germany, Austria & CH' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr', regionBadge: 'Spain & Latin America' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr', regionBadge: 'Italy & Europe' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl', regionBadge: 'GCC & Middle East' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', dir: 'rtl', regionBadge: 'پاکستان و برآمدات' },
];

export interface InvoiceTranslationStrings {
  invoiceTitle: string;
  invoiceNumberLabel: string;
  dateLabel: string;
  dueDateLabel: string;
  poRefLabel: string;
  billToLabel: string;
  attentionLabel: string;
  taxIdLabel: string;
  paymentDeliveryTermsLabel: string;
  paymentTermsDefault: string;
  deliveryTermsDefault: string;
  currencyLabel: string;
  taxSchemeLabel: string;
  colIndex: string;
  colDescription: string;
  colQty: string;
  colRate: string;
  colAmount: string;
  addItemBtn: string;
  totalWordsLabel: string;
  bankingDetailsHeading: string;
  bankNameLabel: string;
  bankNameDefault: string;
  accountTitleLabel: string;
  accountTitleDefault: string;
  ibanLabel: string;
  swiftLabel: string;
  subtotalLabel: string;
  grandTotalLabel: string;
  zeroDbBadge: string;
  instructionsTitle: string;
  instruction1: string;
  instruction2: string;
  instruction3: string;
  authorizedSignatoryTitle: string;
  signatoryRoleDefault: string;
  signatureDateLabel: string;
  stampSealText: string;
  declaration: string;
  footerWatermark: string;
  printButtonText: string;
  resetButtonText: string;
  saveButtonText: string;
  nextNoButtonText: string;
}

export const INVOICE_TRANSLATIONS: Record<SupportedInvoiceLanguage, InvoiceTranslationStrings> = {
  en: {
    invoiceTitle: 'COMMERCIAL INVOICE',
    invoiceNumberLabel: 'Invoice No:',
    dateLabel: 'Date:',
    dueDateLabel: 'Due Date:',
    poRefLabel: 'PO Ref:',
    billToLabel: 'Bill To (Consignee)',
    attentionLabel: 'Attention / Procurement Director:',
    taxIdLabel: 'Buyer Tax / VAT ID:',
    paymentDeliveryTermsLabel: 'Payment & Delivery Terms',
    paymentTermsDefault: 'Net 30 Days / TT Wire / LC at Sight',
    deliveryTermsDefault: 'FOB Sialkot / CIF Frankfurt Airport Cargo',
    currencyLabel: 'Currency',
    taxSchemeLabel: 'Tax Scheme',
    colIndex: '#',
    colDescription: 'Item Description & Technical Specifications',
    colQty: 'Qty',
    colRate: 'Unit Rate',
    colAmount: 'Amount',
    addItemBtn: 'Add Line Item',
    totalWordsLabel: 'Total Amount In Words',
    bankingDetailsHeading: 'Banking & Wire Transfer Details:',
    bankNameLabel: 'Bank Name:',
    bankNameDefault: 'Meezan Bank Ltd / Standard Chartered Sialkot',
    accountTitleLabel: 'Account Title:',
    accountTitleDefault: 'evonix technologies Sialkot',
    ibanLabel: 'IBAN:',
    swiftLabel: 'SWIFT / BIC:',
    subtotalLabel: 'Subtotal:',
    grandTotalLabel: 'Grand Total Due:',
    zeroDbBadge: 'Zero Database Privacy · Encrypted Client Memory',
    instructionsTitle: 'Payment & Acceptance Instructions:',
    instruction1: 'Direct wire transfers must quote Invoice #{invoiceNumber} on swift remarks.',
    instruction2: 'Inspection certificates must match verified surgical lots prior to cargo departure.',
    instruction3: 'All disputes are subject to Sialkot Chamber of Commerce & Industry (SCCI) arbitration.',
    authorizedSignatoryTitle: 'Authorized Signatory',
    signatoryRoleDefault: 'Authorized Signatory & Chief Technology Officer',
    signatureDateLabel: 'Date:',
    stampSealText: 'EVONIX TECHNOLOGIES\nOFFICIAL EXPORT SEAL\nVERIFIED & PASSED',
    declaration: 'We certify that this invoice shows the actual price of the goods described, that no other invoice has been or will be issued, and that all particulars are true and correct.',
    footerWatermark: 'Certified Commercial Document generated via EVONIX Zero-Database Invoice Hub · Kotli Behram, Sialkot, Pakistan · Verification: https://www.evonixtec.com/invoice',
    printButtonText: 'Print / Save A4 PDF',
    resetButtonText: 'Reset to Defaults',
    saveButtonText: 'Save Locally',
    nextNoButtonText: 'Next No.',
  },

  nl: {
    invoiceTitle: 'HANDELSFACTUUR',
    invoiceNumberLabel: 'Factuurnummer:',
    dateLabel: 'Factuurdatum:',
    dueDateLabel: 'Vervaldatum:',
    poRefLabel: 'Inkooporder ref:',
    billToLabel: 'Factureren aan (Geadresseerde)',
    attentionLabel: 'T.a.v. Inkoopdirectie / Contactpersoon:',
    taxIdLabel: 'Btw- / Ondernemingsnummer koper:',
    paymentDeliveryTermsLabel: 'Betalings- en leveringsvoorwaarden',
    paymentTermsDefault: 'Netto 30 Dagen / Bankoverschrijving / L/C op Zicht',
    deliveryTermsDefault: 'FOB Sialkot / CIF Schiphol Amsterdam Vracht',
    currencyLabel: 'Valuta',
    taxSchemeLabel: 'Belastingregeling',
    colIndex: 'Nr.',
    colDescription: 'Omschrijving van goederen & technische specificaties',
    colQty: 'Aantal',
    colRate: 'Eenheidsprijs',
    colAmount: 'Bedrag',
    addItemBtn: 'Nieuwe regel toevoegen',
    totalWordsLabel: 'Totaalbedrag in letters / woorden',
    bankingDetailsHeading: 'Bank- en overschrijvingsgegevens:',
    bankNameLabel: 'Banknaam:',
    bankNameDefault: 'Meezan Bank Ltd / Standard Chartered Sialkot',
    accountTitleLabel: 'Rekeninghouder:',
    accountTitleDefault: 'evonix technologies Sialkot',
    ibanLabel: 'IBAN:',
    swiftLabel: 'SWIFT / BIC:',
    subtotalLabel: 'Subtotaal:',
    grandTotalLabel: 'Totaal te betalen:',
    zeroDbBadge: 'Zero-Database Privacy · Versleuteld Lokaal Geheugen',
    instructionsTitle: 'Betalings- en leveringsinstructies:',
    instruction1: 'Vermeld bij bankoverschrijving altijd factuurnummer #{invoiceNumber} in de betalingsreferentie.',
    instruction2: 'Inspectiecertificaten dienen vóór vertrek van de vracht overeen te komen met de geverifieerde partij.',
    instruction3: 'Geschillen vallen onder de arbitrage van de Sialkot Chamber of Commerce & Industry (SCCI).',
    authorizedSignatoryTitle: 'Bevoegde Ondertekenaar',
    signatoryRoleDefault: 'Bevoegde Ondertekenaar & Chief Technology Officer',
    signatureDateLabel: 'Datum:',
    stampSealText: 'EVONIX TECHNOLOGIES\nOFFICIËLE EXPORTZEGEL\nGEVERIFIEERD & GOEDGEKEURD',
    declaration: 'Wij verklaren dat deze factuur de werkelijke en juiste prijs vermeldt van de beschreven goederen, dat er geen andere factuur is of zal worden uitgereikt en dat alle bijzonderheden waarheidsgetrouw zijn.',
    footerWatermark: 'Gecertificeerd handelsdocument gegenereerd via EVONIX Zero-Database Invoice Hub · Kotli Behram, Sialkot, Pakistan · Verificatie: https://www.evonixtec.com/invoice',
    printButtonText: 'Afdrukken / Opslaan als A4 PDF',
    resetButtonText: 'Standaardwaarden herstellen',
    saveButtonText: 'Lokaal opslaan',
    nextNoButtonText: 'Volgend factuurnr.',
  },

  fr: {
    invoiceTitle: 'FACTURE COMMERCIALE',
    invoiceNumberLabel: 'N° de facture :',
    dateLabel: 'Date de facturation :',
    dueDateLabel: 'Date d’échéance :',
    poRefLabel: 'Réf. Bon de commande :',
    billToLabel: 'Facturer à (Destinataire / Client)',
    attentionLabel: 'À l’attention de la direction des achats :',
    taxIdLabel: 'N° de TVA intracommunautaire client :',
    paymentDeliveryTermsLabel: 'Conditions de paiement et de livraison',
    paymentTermsDefault: 'Net 30 Jours / Virement bancaire Swift / Crédit documentaire',
    deliveryTermsDefault: 'FOB Sialkot / CIF Aéroport Paris-CDG Fret',
    currencyLabel: 'Devise',
    taxSchemeLabel: 'Régime fiscal',
    colIndex: 'N°',
    colDescription: 'Désignation des marchandises & spécifications techniques',
    colQty: 'Qté',
    colRate: 'Prix unitaire',
    colAmount: 'Montant HT',
    addItemBtn: 'Ajouter une ligne d’article',
    totalWordsLabel: 'Montant total en toutes lettres',
    bankingDetailsHeading: 'Coordonnées bancaires & de virement :',
    bankNameLabel: 'Banque :',
    bankNameDefault: 'Meezan Bank Ltd / Standard Chartered Sialkot',
    accountTitleLabel: 'Titulaire du compte :',
    accountTitleDefault: 'evonix technologies Sialkot',
    ibanLabel: 'IBAN :',
    swiftLabel: 'SWIFT / BIC :',
    subtotalLabel: 'Sous-total HT :',
    grandTotalLabel: 'Total général à payer :',
    zeroDbBadge: 'Confidentialité Sans BD · Mémoire Client Chiffrée',
    instructionsTitle: 'Instructions de paiement et de conformité :',
    instruction1: 'Tout virement bancaire doit obligatoirement mentionner le N° de facture #{invoiceNumber}.',
    instruction2: 'Les certificats de conformité chirurgicale doivent correspondre aux lots avant expédition.',
    instruction3: 'Tout litige commercial est soumis à l’arbitrage de la Chambre de Commerce et d’Industrie de Sialkot (SCCI).',
    authorizedSignatoryTitle: 'Signataire autorisé',
    signatoryRoleDefault: 'Signataire autorisé & Directeur de la technologie',
    signatureDateLabel: 'Date :',
    stampSealText: 'EVONIX TECHNOLOGIES\nSCEAU D’EXPORTATION OFFICIEL\nVÉRIFIÉ & CONFORME',
    declaration: 'Nous certifions que la présente facture mentionne le prix réel et effectif des marchandises décrites, qu’aucune autre facture n’a été ni ne sera émise et que toutes les mentions sont exactes et véridiques.',
    footerWatermark: 'Document commercial certifié généré via EVONIX Zero-Database Invoice Hub · Kotli Behram, Sialkot, Pakistan · Vérification : https://www.evonixtec.com/invoice',
    printButtonText: 'Imprimer / Sauvegarder en PDF A4',
    resetButtonText: 'Réinitialiser aux valeurs d’origine',
    saveButtonText: 'Enregistrer en local',
    nextNoButtonText: 'Numéro suivant',
  },

  de: {
    invoiceTitle: 'HANDELSRECHNUNG',
    invoiceNumberLabel: 'Rechnungsnummer:',
    dateLabel: 'Rechnungsdatum:',
    dueDateLabel: 'Fälligkeitsdatum:',
    poRefLabel: 'Bestellreferenz (PO):',
    billToLabel: 'Rechnungsempfänger (Empfänger / Importeur)',
    attentionLabel: 'Zu Händen Einkaufsleitung / Ansprechpartner:',
    taxIdLabel: 'USt-IdNr. / Steuernummer des Käufers:',
    paymentDeliveryTermsLabel: 'Zahlungs- und Lieferbedingungen',
    paymentTermsDefault: 'Netto 30 Tage / Banküberweisung TT / Akkreditiv (LC)',
    deliveryTermsDefault: 'FOB Sialkot / CIF Flughafen Frankfurt Cargo',
    currencyLabel: 'Währung',
    taxSchemeLabel: 'Steuerregelung',
    colIndex: 'Pos.',
    colDescription: 'Artikelbezeichnung & technische Spezifikationen',
    colQty: 'Menge',
    colRate: 'Einzelpreis',
    colAmount: 'Gesamtbetrag',
    addItemBtn: 'Position hinzufügen',
    totalWordsLabel: 'Gesamtbetrag in Worten',
    bankingDetailsHeading: 'Bankverbindung & Überweisungsinformationen:',
    bankNameLabel: 'Bankname:',
    bankNameDefault: 'Meezan Bank Ltd / Standard Chartered Sialkot',
    accountTitleLabel: 'Kontoinhaber:',
    accountTitleDefault: 'evonix technologies Sialkot',
    ibanLabel: 'IBAN:',
    swiftLabel: 'SWIFT / BIC:',
    subtotalLabel: 'Zwischensumme:',
    grandTotalLabel: 'Gesamtsumme fällig:',
    zeroDbBadge: 'Null-Datenbank Datenschutz · Lokaler Speicher',
    instructionsTitle: 'Zahlungs- und Abnahmehinweise:',
    instruction1: 'Bitte geben Sie bei der Überweisung unbedingt die Rechnungsnummer #{invoiceNumber} im Verwendungszweck an.',
    instruction2: 'Prüfzertifikate müssen vor Verladung der Fracht mit den verifizierten Chargen übereinstimmen.',
    instruction3: 'Alle Streitigkeiten unterliegen dem Schiedsverfahren der Industrie- und Handelskammer Sialkot (SCCI).',
    authorizedSignatoryTitle: 'Zeichnungsberechtigter',
    signatoryRoleDefault: 'Zeichnungsberechtigter & Chief Technology Officer',
    signatureDateLabel: 'Datum:',
    stampSealText: 'EVONIX TECHNOLOGIES\nOFFIZIELLER EXPORTSIEGEL\nGEPRÜFT & FREIGEGEBEN',
    declaration: 'Wir bestätigen hiermit, dass diese Rechnung den tatsächlichen Preis der aufgeführten Waren ausweist, keine weitere Rechnung ausgestellt wurde oder wird und alle Angaben wahrheitsgemäß und korrekt sind.',
    footerWatermark: 'Zertifiziertes Handelsdokument generiert über EVONIX Zero-Database Invoice Hub · Kotli Behram, Sialkot, Pakistan · Verifizierung: https://www.evonixtec.com/invoice',
    printButtonText: 'Drucken / Als A4-PDF speichern',
    resetButtonText: 'Auf Standard zurücksetzen',
    saveButtonText: 'Lokal speichern',
    nextNoButtonText: 'Nächste Rechnungs-Nr.',
  },

  es: {
    invoiceTitle: 'FACTURA COMERCIAL',
    invoiceNumberLabel: 'N.º de Factura:',
    dateLabel: 'Fecha de Emisión:',
    dueDateLabel: 'Fecha de Vencimiento:',
    poRefLabel: 'Ref. Orden de Compra (OC):',
    billToLabel: 'Facturar a (Consignatario / Comprador)',
    attentionLabel: 'Atención / Director de Compras:',
    taxIdLabel: 'NIF / CIF / IVA del Comprador:',
    paymentDeliveryTermsLabel: 'Condiciones de Pago y Entrega',
    paymentTermsDefault: 'Neto 30 Días / Transferencia Bancaria Swift / Carta de Crédito',
    deliveryTermsDefault: 'FOB Sialkot / CIF Aeropuerto de Madrid Barajas Carga',
    currencyLabel: 'Moneda',
    taxSchemeLabel: 'Régimen Fiscal',
    colIndex: 'N.º',
    colDescription: 'Descripción de mercancías y especificaciones técnicas',
    colQty: 'Cant.',
    colRate: 'Precio Unitario',
    colAmount: 'Importe Total',
    addItemBtn: 'Añadir partida',
    totalWordsLabel: 'Importe Total en Letras',
    bankingDetailsHeading: 'Datos bancarios y de transferencia:',
    bankNameLabel: 'Nombre del Banco:',
    bankNameDefault: 'Meezan Bank Ltd / Standard Chartered Sialkot',
    accountTitleLabel: 'Titular de la Cuenta:',
    accountTitleDefault: 'evonix technologies Sialkot',
    ibanLabel: 'IBAN:',
    swiftLabel: 'SWIFT / BIC:',
    subtotalLabel: 'Subtotal:',
    grandTotalLabel: 'Total General Debido:',
    zeroDbBadge: 'Privacidad Cero Base de Datos · Memoria Cifrada',
    instructionsTitle: 'Instrucciones de pago y conformidad:',
    instruction1: 'Las transferencias bancarias deben indicar el N.º de Factura #{invoiceNumber} en el concepto.',
    instruction2: 'Los certificados de inspección deben coincidir con los lotes quirúrgicos antes del despacho.',
    instruction3: 'Cualquier controversia se someterá al arbitraje de la Cámara de Comercio e Industria de Sialkot (SCCI).',
    authorizedSignatoryTitle: 'Firmante Autorizado',
    signatoryRoleDefault: 'Firmante Autorizado y Director de Tecnología',
    signatureDateLabel: 'Fecha:',
    stampSealText: 'EVONIX TECHNOLOGIES\nSELLO OFICIAL DE EXPORTACIÓN\nVERIFICADO Y APROBADO',
    declaration: 'Certificamos que la presente factura refleja el precio real de las mercancías descritas, que no se ha emitido ni se emitirá ninguna otra factura y que todos los datos son verídicos y exactos.',
    footerWatermark: 'Documento comercial certificado generado mediante EVONIX Zero-Database Invoice Hub · Kotli Behram, Sialkot, Pakistán · Verificación: https://www.evonixtec.com/invoice',
    printButtonText: 'Imprimir / Guardar PDF A4',
    resetButtonText: 'Restablecer Valores Iniciales',
    saveButtonText: 'Guardar en Local',
    nextNoButtonText: 'Siguiente Factura',
  },

  it: {
    invoiceTitle: 'FATTURA COMMERCIALE',
    invoiceNumberLabel: 'Fattura N.:',
    dateLabel: 'Data di Emissione:',
    dueDateLabel: 'Data di Scadenza:',
    poRefLabel: 'Rif. Ordine di Acquisto:',
    billToLabel: 'Fatturare a (Destinatario / Acquirente)',
    attentionLabel: 'All’attenzione della Direzione Acquisti:',
    taxIdLabel: 'Partita IVA / Codice Fiscale Acquirente:',
    paymentDeliveryTermsLabel: 'Termini di Pagamento e Consegna',
    paymentTermsDefault: 'Netto 30 Giorni / Bonifico Bancario Swift / Lettera di Credito',
    deliveryTermsDefault: 'FOB Sialkot / CIF Aeroporto di Milano Malpensa Cargo',
    currencyLabel: 'Valuta',
    taxSchemeLabel: 'Regime Fiscale',
    colIndex: 'N.',
    colDescription: 'Descrizione merci e specifiche tecniche',
    colQty: 'Q.tà',
    colRate: 'Prezzo Unitario',
    colAmount: 'Importo',
    addItemBtn: 'Aggiungi voce',
    totalWordsLabel: 'Importo Totale in Lettere',
    bankingDetailsHeading: 'Dati Bancari per Bonifico:',
    bankNameLabel: 'Nome Banca:',
    bankNameDefault: 'Meezan Bank Ltd / Standard Chartered Sialkot',
    accountTitleLabel: 'Intestatario Conto:',
    accountTitleDefault: 'evonix technologies Sialkot',
    ibanLabel: 'IBAN:',
    swiftLabel: 'SWIFT / BIC:',
    subtotalLabel: 'Totale Parziale:',
    grandTotalLabel: 'Totale Dovuto:',
    zeroDbBadge: 'Privacy Zero Database · Memoria Crittografata',
    instructionsTitle: 'Istruzioni di pagamento e accettazione:',
    instruction1: 'I bonifici bancari devono riportare il numero di fattura #{invoiceNumber} nella causale.',
    instruction2: 'I certificati di ispezione chirurgica devono corrispondere ai lotti verificati prima della spedizione.',
    instruction3: 'Eventuali controversie sono soggette all’arbitrato della Camera di Commercio di Sialkot (SCCI).',
    authorizedSignatoryTitle: 'Firmatario Autorizzato',
    signatoryRoleDefault: 'Firmatario Autorizzato & Direttore Tecnologico',
    signatureDateLabel: 'Data:',
    stampSealText: 'EVONIX TECHNOLOGIES\nSIGILLO UFFICIALE DI ESPORTAZIONE\nVERIFICATO E APPROVATO',
    declaration: 'Si certifica che la presente fattura indica il prezzo reale delle merci descritte, che non è stata né sarà emessa altra fattura e che tutti i dati sono veritieri e conformi.',
    footerWatermark: 'Documento commerciale certificato generato tramite EVONIX Zero-Database Invoice Hub · Kotli Behram, Sialkot, Pakistan · Verifica: https://www.evonixtec.com/invoice',
    printButtonText: 'Stampa / Salva in PDF A4',
    resetButtonText: 'Ripristina Impostazioni',
    saveButtonText: 'Salva in Locale',
    nextNoButtonText: 'Numero Successivo',
  },

  ar: {
    invoiceTitle: 'فاتورة تجارية رسمية',
    invoiceNumberLabel: 'رقم الفاتورة:',
    dateLabel: 'تاريخ الفاتورة:',
    dueDateLabel: 'تاريخ الاستحقاق:',
    poRefLabel: 'مرجع أمر الشراء:',
    billToLabel: 'فاتورة إلى (المرسل إليه / المشتري)',
    attentionLabel: 'عناية / مدير المشتريات:',
    taxIdLabel: 'الرقم الضريبي للمشتري (VAT ID):',
    paymentDeliveryTermsLabel: 'شروط الدفع والتسليم الدولي',
    paymentTermsDefault: 'صافي 30 يوماً / تحويل بنكي سويفت / اعتماد مستندي معزز',
    deliveryTermsDefault: 'FOB Sialkot / CIF مطار دبي الدولي للشحن الجوي',
    currencyLabel: 'العملة',
    taxSchemeLabel: 'النظام الضريبي',
    colIndex: 'م',
    colDescription: 'بيان ووصف البضائع والمواصفات الفنية المعتمدة',
    colQty: 'الكمية',
    colRate: 'سعر الوحدة',
    colAmount: 'المبلغ الإجمالي',
    addItemBtn: 'إضافة بند جديد للفاتورة',
    totalWordsLabel: 'المبلغ الإجمالي كتابةً بالكلمات',
    bankingDetailsHeading: 'بيانات الحساب المصرفي والتحويل السريع (سويفت):',
    bankNameLabel: 'اسم المصرف:',
    bankNameDefault: 'بنك ميزان الإسلامي / ستاندرد تشارترد سيالكوت',
    accountTitleLabel: 'اسم صاحب الحساب:',
    accountTitleDefault: 'evonix technologies Sialkot',
    ibanLabel: 'رقم الآيبان (IBAN):',
    swiftLabel: 'رمز السويفت (SWIFT / BIC):',
    subtotalLabel: 'المجموع الفرعي:',
    grandTotalLabel: 'المجموع الإجمالي المستحق:',
    zeroDbBadge: 'خصوصية تامة بدون قاعدة بيانات · ذاكرة مشفرة محلياً',
    instructionsTitle: 'تعليمات الدفع والمطابقة الرسمية:',
    instruction1: 'يجب ذكر رقم الفاتورة #{invoiceNumber} بوضوح في خانة تفاصيل التحويل البنكي (SWIFT Remarks).',
    instruction2: 'يجب أن تتطابق شهادات الفحص والتعقيم الطبي مع الشحنات قبل مغادرة البضائع للشحن الجوي.',
    instruction3: 'تخضع جميع المعاملات والنزاعات التجارية للتحكيم الرسمي بغرفة تجارة وصناعة سيالكوت (SCCI).',
    authorizedSignatoryTitle: 'المفوض بالتوقيع والاعتماد',
    signatoryRoleDefault: 'المفوض بالتوقيع والمدير التنفيذي للتكنولوجيا (CTO)',
    signatureDateLabel: 'التاريخ:',
    stampSealText: 'إيفونكس للتكنولوجيا المتقدمة\nالختم الرسمي للتصدير الدولي\nتم الفحص والاعتماد الفني',
    declaration: 'نشهد بموجب هذا أن هذه الفاتورة توضح القيمة الحقيقية والفعلية للبضائع الموصوفة، وأنه لم ولن يتم إصدار أي فاتورة أخرى، وأن جميع البيانات المذكورة صحيحة ودقيقة تماماً.',
    footerWatermark: 'وثيقة تجارية معتمدة صادرة عبر منصة إيفونكس المشفرة · كوتلي بهرام، سيالكوت، باكستان · التحقق: https://www.evonixtec.com/invoice',
    printButtonText: 'طباعة / حفظ كملف PDF بقياس A4',
    resetButtonText: 'استعادة الإعدادات الافتراضية',
    saveButtonText: 'حفظ محلياً في المتصفح',
    nextNoButtonText: 'الرقم التالي للفاتورة',
  },

  ur: {
    invoiceTitle: 'کمرشل ایکسپورٹ انوائس',
    invoiceNumberLabel: 'انوائس نمبر:',
    dateLabel: 'تاریخ اجرا:',
    dueDateLabel: 'آخری تاریخ ادائیگی:',
    poRefLabel: 'پرچیز آرڈر نمبر:',
    billToLabel: 'بنام خریدار (کنسائنی / امپورٹر)',
    attentionLabel: 'برائے توجہ / ڈائریکٹر پروکیورمنٹ:',
    taxIdLabel: 'خریدار کا ٹیکس / این ٹی این / سیلز ٹیکس نمبر:',
    paymentDeliveryTermsLabel: 'شرائط ادائیگی و ترسیل',
    paymentTermsDefault: 'نیٹ 30 یوم / ٹی ٹی وائر ٹرانسفر / ایل سی ایٹ سائٹ',
    deliveryTermsDefault: 'ایف او بی سیالکوٹ / سی آئی ایف ائیر کارگو',
    currencyLabel: 'کرنسی',
    taxSchemeLabel: 'ٹیکس کا نظام',
    colIndex: 'نمبر شمار',
    colDescription: 'تفصیل اشیاء، سرجیکل آلات و تکنیکی خصوصیات',
    colQty: 'تعداد',
    colRate: 'فی یونٹ قیمت',
    colAmount: 'کل رقم',
    addItemBtn: 'نئی آئٹم شامل کریں',
    totalWordsLabel: 'کل واجب الادا رقم الفاظ میں',
    bankingDetailsHeading: 'بینک وائر ٹرانسفر کی تفصیلات:',
    bankNameLabel: 'بینک کا نام:',
    bankNameDefault: 'میزان بینک لمیٹڈ / اسٹینڈرڈ چارٹرڈ سیالکوٹ',
    accountTitleLabel: 'اکاؤنٹ کا عنوان:',
    accountTitleDefault: 'evonix technologies Sialkot',
    ibanLabel: 'آئی بی اے این (IBAN):',
    swiftLabel: 'سوئفٹ کوڈ (SWIFT):',
    subtotalLabel: 'ذیلی میزان (سب ٹوٹل):',
    grandTotalLabel: 'کل واجب الادا رقم:',
    zeroDbBadge: 'زیرو ڈیٹا بیس مکمل رازداری · محفوظ لوکل انکرپٹڈ میموری',
    instructionsTitle: 'ادائیگی اور تصدیق کی ضروری ہدایات:',
    instruction1: 'بینک وائر ٹرانسفر کے وقت سوئفٹ ریمارکس میں انوائس نمبر #{invoiceNumber} لازماً درج کریں۔',
    instruction2: 'سرجیکل و میڈیکل لاٹس کی کوالٹی انسپکشن سرٹیفکیٹ کارگو روانگی سے قبل تصدیق شدہ ہونا ضروری ہے۔',
    instruction3: 'تمام تجارتی تنازعات سیالکوٹ چیمبر آف کامرس اینڈ انڈسٹری (SCCI) کے ثالثی قوانین کے تابع ہیں۔',
    authorizedSignatoryTitle: 'مجاز دستخط کنندہ',
    signatoryRoleDefault: 'مجاز دستخط کنندہ و چیف ٹیکنالوجی آفیسر (CTO)',
    signatureDateLabel: 'تاریخ:',
    stampSealText: 'ایوونکس ٹیکنالوجیز\nآفیشل ایکسپورٹ مہر\nتصدیق شدہ و منظور شدہ برآمد',
    declaration: 'ہم تصدیق کرتے ہیں کہ یہ انوائس بیان کردہ اشیاء کی اصل اور درست قیمت ظاہر کرتی ہے، اس کے علاوہ کوئی دوسری انوائس جاری نہیں کی گئی اور نہ کی جائے گی، اور تمام مندرجات بالکل سچ اور درست ہیں۔',
    footerWatermark: 'تصدیق شدہ کمرشل دستاویز برائے برآمدات - ایوونکس زیرو ڈیٹا بیس انوائس ہب · کوٹلی بہرام، سیالکوٹ، پاکستان · تصدیق: https://www.evonixtec.com/invoice',
    printButtonText: 'پرنٹ کریں / محفوظ کریں A4 PDF',
    resetButtonText: 'اصل سیٹنگز بحال کریں',
    saveButtonText: 'سیٹنگز محفوظ کریں',
    nextNoButtonText: 'اگلا انوائس نمبر',
  },
};

/**
 * Sample items translated in all requested languages
 */
export const SAMPLE_ITEMS_BY_LANG: Record<
  SupportedInvoiceLanguage,
  Array<{ id: string; description: string; quantity: number; rate: number }>
> = {
  en: [
    { id: '1', description: 'Titanium Micro-Surgical Scalpel Handles Grade 5 Medical', quantity: 150, rate: 24.0 },
    { id: '2', description: 'Atraumatic Cardiovascular Forceps SS316 Hospital Grade', quantity: 80, rate: 32.5 },
    { id: '3', description: 'Digital Cloud ERP Workstation License & Maintenance (1 Year)', quantity: 1, rate: 1450.0 },
  ],
  nl: [
    { id: '1', description: 'Titanium Microchirurgische Scalpelhouders Graad 5 Medisch', quantity: 150, rate: 24.0 },
    { id: '2', description: 'Atraumatische Cardiovasculaire Pincetten RVS 316 Ziekenhuiskwaliteit', quantity: 80, rate: 32.5 },
    { id: '3', description: 'Digitaal Cloud ERP Werkstation Licentie & Onderhoud (1 Jaar)', quantity: 1, rate: 1450.0 },
  ],
  fr: [
    { id: '1', description: 'Manches de bistouri microchirurgical en titane Grade 5 Médical', quantity: 150, rate: 24.0 },
    { id: '2', description: 'Pinces cardiovasculaires atraumatiques Acier Inox SS316 Milieu Hospitalier', quantity: 80, rate: 32.5 },
    { id: '3', description: 'Licence ERP Cloud & Maintenance Poste de Travail (1 An)', quantity: 1, rate: 1450.0 },
  ],
  de: [
    { id: '1', description: 'Titan-Skalpellgriffe für Mikrochirurgie Güteklasse 5 Medizintechnik', quantity: 150, rate: 24.0 },
    { id: '2', description: 'Atraumatische Herz-Gefäß-Pinzetten Edelstahl SS316 Klinikqualität', quantity: 80, rate: 32.5 },
    { id: '3', description: 'Digital Cloud ERP Workstation Lizenz & Wartungsvertrag (1 Jahr)', quantity: 1, rate: 1450.0 },
  ],
  es: [
    { id: '1', description: 'Mangos de bisturí microquirúrgico de titanio Grado 5 Médico', quantity: 150, rate: 24.0 },
    { id: '2', description: 'Pinzas cardiovasculares atraumáticas Acero Inoxidable SS316 Hospitalario', quantity: 80, rate: 32.5 },
    { id: '3', description: 'Licencia Digital Cloud ERP y Mantenimiento de Estación (1 Año)', quantity: 1, rate: 1450.0 },
  ],
  it: [
    { id: '1', description: 'Manici per bisturi microchirurgico in titanio Grado 5 Medicale', quantity: 150, rate: 24.0 },
    { id: '2', description: 'Pinze cardiovascolari atraumatiche Acciaio Inox SS316 Uso Ospedaliero', quantity: 80, rate: 32.5 },
    { id: '3', description: 'Licenza Workstation ERP Cloud e Manutenzione (1 Anno)', quantity: 1, rate: 1450.0 },
  ],
  ar: [
    { id: '1', description: 'مقابض مشارط جراحية دقيقة من التيتانيوم الطبي عالي النقاوة Grade 5', quantity: 150, rate: 24.0 },
    { id: '2', description: 'ملاقط أوعية دموية وجراحية غير رضية ستانلس ستيل SS316 درجة طبية للمستشفيات', quantity: 80, rate: 32.5 },
    { id: '3', description: 'ترخيص وصيانة محطة السحابة لإدارة الموارد السحابية ERP (لمدة سنة كاملة)', quantity: 1, rate: 1450.0 },
  ],
  ur: [
    { id: '1', description: 'ٹائٹینیم مائیکرو سرجیکل اسکیلپل ہینڈلز گریڈ 5 میڈیکل ایکسپورٹ کوالٹی', quantity: 150, rate: 24.0 },
    { id: '2', description: 'ایٹراومیٹک کارڈیو ویسکولر سرجیکل فورسپس ایس ایس 316 ہسپتال گریڈ', quantity: 80, rate: 32.5 },
    { id: '3', description: 'ڈیجیٹل کلاؤڈ ای آر پی ورک اسٹیشن سالانہ سافٹ ویئر لائسنس و سروسنگ', quantity: 1, rate: 1450.0 },
  ],
};

/**
 * Robust Multilingual Number To Words Converter
 */
export function convertNumberToWordsLocalized(
  num: number,
  currencyCode: string = 'USD',
  lang: SupportedInvoiceLanguage = 'en'
): string {
  if (isNaN(num) || num === 0) {
    if (lang === 'ur') return `صفر ${currencyCode} فقط`;
    if (lang === 'ar') return `صفر ${currencyCode} فقط لا غير`;
    if (lang === 'nl') return `Nul ${currencyCode} Alleen`;
    if (lang === 'fr') return `Zéro ${currencyCode} Seulement`;
    if (lang === 'de') return `Null ${currencyCode}`;
    if (lang === 'es') return `Cero ${currencyCode} Solamente`;
    if (lang === 'it') return `Zero ${currencyCode}`;
    return `Zero ${currencyCode} Only`;
  }

  const integerPart = Math.floor(Math.abs(num));
  const decimalPart = Math.round((Math.abs(num) - integerPart) * 100);

  // Currency unit titles by language
  const currencyLabels: Record<string, Record<SupportedInvoiceLanguage, { main: string; sub: string }>> = {
    USD: {
      en: { main: 'US Dollars', sub: 'Cents' },
      nl: { main: 'US Dollars', sub: 'Cent' },
      fr: { main: 'Dollars Américains', sub: 'Centimes' },
      de: { main: 'US-Dollar', sub: 'Cents' },
      es: { main: 'Dólares Estadounidenses', sub: 'Centavos' },
      it: { main: 'Dollari Statunitensi', sub: 'Centesimi' },
      ar: { main: 'دولار أمريكي', sub: 'سنت' },
      ur: { main: 'امریکی ڈالر', sub: 'سینٹس' },
    },
    EUR: {
      en: { main: 'Euros', sub: 'Cents' },
      nl: { main: 'Euro', sub: 'Cent' },
      fr: { main: 'Euros', sub: 'Centimes' },
      de: { main: 'Euro', sub: 'Cents' },
      es: { main: 'Euros', sub: 'Céntimos' },
      it: { main: 'Euro', sub: 'Centesimi' },
      ar: { main: 'يورو', sub: 'سنت' },
      ur: { main: 'یورو', sub: 'سینٹس' },
    },
    GBP: {
      en: { main: 'British Pounds', sub: 'Pence' },
      nl: { main: 'Britse Ponden', sub: 'Pence' },
      fr: { main: 'Livres Sterling', sub: 'Pence' },
      de: { main: 'Britische Pfund', sub: 'Pence' },
      es: { main: 'Libras Esterlinas', sub: 'Peniques' },
      it: { main: 'Sterline Britanniche', sub: 'Pence' },
      ar: { main: 'جنيه إسترليني', sub: 'بنس' },
      ur: { main: 'برطانوی پاؤنڈز', sub: 'پینس' },
    },
    PKR: {
      en: { main: 'Pakistani Rupees', sub: 'Paisa' },
      nl: { main: 'Pakistaanse Roepies', sub: 'Paisa' },
      fr: { main: 'Roupies Pakistanaises', sub: 'Paisa' },
      de: { main: 'Pakistanische Rupien', sub: 'Paisa' },
      es: { main: 'Rupias Pakistaníes', sub: 'Paisa' },
      it: { main: 'Rupie Pakistane', sub: 'Paisa' },
      ar: { main: 'روبية باكستانية', sub: 'بيزة' },
      ur: { main: 'پاکستانی روپے', sub: 'پیسے' },
    },
    AED: {
      en: { main: 'UAE Dirhams', sub: 'Fils' },
      nl: { main: 'VAE Dirhams', sub: 'Fils' },
      fr: { main: 'Dirhams Émiratis', sub: 'Fils' },
      de: { main: 'VAE-Dirham', sub: 'Fils' },
      es: { main: 'Dírham de EAU', sub: 'Fils' },
      it: { main: 'Dirham degli EAU', sub: 'Fils' },
      ar: { main: 'درهم إماراتي', sub: 'فلس' },
      ur: { main: 'اماراتی درہم', sub: 'فلس' },
    },
    SAR: {
      en: { main: 'Saudi Riyals', sub: 'Halalas' },
      nl: { main: 'Saoedische Riyals', sub: 'Halalas' },
      fr: { main: 'Riyals Saoudiens', sub: 'Halalas' },
      de: { main: 'Saudi-Riyal', sub: 'Halalas' },
      es: { main: 'Riyales Saudíes', sub: 'Halalas' },
      it: { main: 'Riyal Sauditi', sub: 'Halalas' },
      ar: { main: 'ريال سعودي', sub: 'هللة' },
      ur: { main: 'سعودی ریال', sub: 'ہلالہ' },
    },
  };

  const cUnit = currencyLabels[currencyCode]?.[lang] || { main: currencyCode, sub: 'Cents' };

  // Base English chunk generator
  const onesEn = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tensEn = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function toWordsEn(n: number): string {
    if (n === 0) return 'Zero';
    function chunk(val: number): string {
      let s = '';
      if (val >= 100) {
        s += onesEn[Math.floor(val / 100)] + ' Hundred ';
        val %= 100;
      }
      if (val >= 20) {
        s += tensEn[Math.floor(val / 10)] + (val % 10 !== 0 ? '-' + onesEn[val % 10] : '') + ' ';
      } else if (val > 0) {
        s += onesEn[val] + ' ';
      }
      return s.trim();
    }
    const b = Math.floor(n / 1000000000);
    const m = Math.floor((n % 1000000000) / 1000000);
    const t = Math.floor((n % 1000000) / 1000);
    const rem = n % 1000;
    let res = '';
    if (b) res += chunk(b) + ' Billion ';
    if (m) res += chunk(m) + ' Million ';
    if (t) res += chunk(t) + ' Thousand ';
    if (rem) res += chunk(rem) + ' ';
    return res.trim();
  }

  // Urdu Words Generator
  const onesUr = ['', 'ایک', 'دو', 'تین', 'چار', 'پانچ', 'چھ', 'سات', 'آٹھ', 'نو', 'دس', 'گیارہ', 'بارہ', 'تیرہ', 'چودہ', 'پندرہ', 'سولہ', 'سترہ', 'اٹھارہ', 'انیس'];
  const tensUr = ['', '', 'بیس', 'تیس', 'چالیس', 'پچاس', 'ساٹھ', 'ستر', 'اسی', 'نوے'];

  function toWordsUr(n: number): string {
    if (n === 0) return 'صفر';
    function chunk(val: number): string {
      let s = '';
      if (val >= 100) {
        s += onesUr[Math.floor(val / 100)] + ' سو ';
        val %= 100;
      }
      if (val >= 20) {
        s += (val % 10 !== 0 ? onesUr[val % 10] + ' اور ' : '') + tensUr[Math.floor(val / 10)] + ' ';
      } else if (val > 0) {
        s += onesUr[val] + ' ';
      }
      return s.trim();
    }
    const crore = Math.floor(n / 10000000);
    const lakh = Math.floor((n % 10000000) / 100000);
    const hazar = Math.floor((n % 100000) / 1000);
    const rem = n % 1000;
    let res = '';
    if (crore) res += chunk(crore) + ' کروڑ ';
    if (lakh) res += chunk(lakh) + ' لاکھ ';
    if (hazar) res += chunk(hazar) + ' ہزار ';
    if (rem) res += chunk(rem) + ' ';
    return res.trim() || 'صفر';
  }

  // Arabic Words Generator
  const onesAr = ['', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة', 'عشرة', 'أحد عشر', 'اثنا عشر', 'ثلاثة عشر', 'أربعة عشر', 'خمسة عشر', 'ستة عشر', 'سبعة عشر', 'ثمانية عشر', 'تسعة عشر'];
  const tensAr = ['', '', 'عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'];
  const hundredsAr = ['', 'مائة', 'مئتان', 'ثلاثمائة', 'أربعمائة', 'خمسمائة', 'ستمائة', 'سبعمائة', 'ثمانمائة', 'تسعمائة'];

  function toWordsAr(n: number): string {
    if (n === 0) return 'صفر';
    function chunk(val: number): string {
      let s = '';
      if (val >= 100) {
        s += hundredsAr[Math.floor(val / 100)] + ' ';
        val %= 100;
      }
      if (val >= 20) {
        const o = val % 10;
        const t = Math.floor(val / 10);
        if (o > 0) {
          s += (s ? 'و' : '') + onesAr[o] + ' و' + tensAr[t] + ' ';
        } else {
          s += (s ? 'و' : '') + tensAr[t] + ' ';
        }
      } else if (val > 0) {
        s += (s ? 'و' : '') + onesAr[val] + ' ';
      }
      return s.trim();
    }
    const mil = Math.floor(n / 1000000);
    const th = Math.floor((n % 1000000) / 1000);
    const rem = n % 1000;
    let parts: string[] = [];
    if (mil) parts.push(chunk(mil) + (mil === 1 ? ' مليون' : mil === 2 ? ' مليونان' : ' ملايين'));
    if (th) parts.push(chunk(th) + (th === 1 ? ' ألف' : th === 2 ? ' ألفان' : ' آلاف'));
    if (rem) parts.push(chunk(rem));
    return parts.join(' و ').trim() || 'صفر';
  }

  // French Words Generator
  const onesFr = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
  const tensFr = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingts', 'quatre-vingt-dix'];

  function toWordsFr(n: number): string {
    if (n === 0) return 'zéro';
    function chunk(val: number): string {
      let s = '';
      if (val >= 100) {
        const h = Math.floor(val / 100);
        s += (h > 1 ? onesFr[h] + ' ' : '') + 'cent ';
        val %= 100;
      }
      if (val >= 20) {
        const t = Math.floor(val / 10);
        const o = val % 10;
        s += tensFr[t] + (o > 0 ? (o === 1 ? ' et un' : '-' + onesFr[o]) : '') + ' ';
      } else if (val > 0) {
        s += onesFr[val] + ' ';
      }
      return s.trim();
    }
    const m = Math.floor((n % 1000000000) / 1000000);
    const th = Math.floor((n % 1000000) / 1000);
    const rem = n % 1000;
    let res = '';
    if (m) res += (m > 1 ? chunk(m) + ' millions ' : 'un million ');
    if (th) res += (th > 1 ? chunk(th) + ' mille ' : 'mille ');
    if (rem) res += chunk(rem) + ' ';
    return res.trim() || 'zéro';
  }

  // Dutch Words Generator
  const onesNl = ['', 'één', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien', 'elf', 'twaalf', 'dertien', 'veertien', 'vijftien', 'zestien', 'zeventien', 'achttien', 'negentien'];
  const tensNl = ['', '', 'twintig', 'dertig', 'veertig', 'vijftig', 'zestig', 'zeventig', 'tachtig', 'negentig'];

  function toWordsNl(n: number): string {
    if (n === 0) return 'nul';
    function chunk(val: number): string {
      let s = '';
      if (val >= 100) {
        const h = Math.floor(val / 100);
        s += (h > 1 ? onesNl[h] + ' ' : '') + 'honderd ';
        val %= 100;
      }
      if (val >= 20) {
        const t = Math.floor(val / 10);
        const o = val % 10;
        s += (o > 0 ? onesNl[o] + 'en' : '') + tensNl[t] + ' ';
      } else if (val > 0) {
        s += onesNl[val] + ' ';
      }
      return s.trim();
    }
    const m = Math.floor(n / 1000000);
    const th = Math.floor((n % 1000000) / 1000);
    const rem = n % 1000;
    let res = '';
    if (m) res += chunk(m) + ' miljoen ';
    if (th) res += chunk(th) + 'duizend ';
    if (rem) res += chunk(rem);
    return res.trim() || 'nul';
  }

  // German Words Generator
  const onesDe = ['', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
  const tensDe = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];

  function toWordsDe(n: number): string {
    if (n === 0) return 'null';
    function chunk(val: number): string {
      let s = '';
      if (val >= 100) {
        const h = Math.floor(val / 100);
        s += (h > 1 ? onesDe[h] : 'ein') + 'hundert';
        val %= 100;
      }
      if (val >= 20) {
        const t = Math.floor(val / 10);
        const o = val % 10;
        s += (o > 0 ? onesDe[o] + 'und' : '') + tensDe[t];
      } else if (val > 0) {
        s += onesDe[val];
      }
      return s.trim();
    }
    const m = Math.floor(n / 1000000);
    const th = Math.floor((n % 1000000) / 1000);
    const rem = n % 1000;
    let res = '';
    if (m) res += chunk(m) + ' Millionen ';
    if (th) res += chunk(th) + 'tausend';
    if (rem) res += chunk(rem);
    return res.trim() || 'null';
  }

  // Select generator based on language
  let text = '';
  if (lang === 'ur') {
    text = `${toWordsUr(integerPart)} ${cUnit.main}`;
    if (decimalPart > 0) text += ` اور ${toWordsUr(decimalPart)} ${cUnit.sub}`;
    return text.trim() + ' فقط';
  } else if (lang === 'ar') {
    text = `${toWordsAr(integerPart)} ${cUnit.main}`;
    if (decimalPart > 0) text += ` و ${toWordsAr(decimalPart)} ${cUnit.sub}`;
    return text.trim() + ' فقط لا غير';
  } else if (lang === 'fr') {
    text = `${toWordsFr(integerPart)} ${cUnit.main}`;
    if (decimalPart > 0) text += ` et ${toWordsFr(decimalPart)} ${cUnit.sub}`;
    return text.trim() + ' Seulement';
  } else if (lang === 'nl') {
    text = `${toWordsNl(integerPart)} ${cUnit.main}`;
    if (decimalPart > 0) text += ` en ${toWordsNl(decimalPart)} ${cUnit.sub}`;
    return text.trim() + ' Alleen';
  } else if (lang === 'de') {
    text = `${toWordsDe(integerPart)} ${cUnit.main}`;
    if (decimalPart > 0) text += ` und ${toWordsDe(decimalPart)} ${cUnit.sub}`;
    return text.trim();
  } else {
    // en, es, it
    text = `${toWordsEn(integerPart)} ${cUnit.main}`;
    if (decimalPart > 0) text += ` and ${toWordsEn(decimalPart)} ${cUnit.sub}`;
    return text.trim() + ' Only';
  }
}

export interface InvoiceTitlePresets {
  commercial: string;
  tax: string;
  proforma: string;
  vat: string;
  gst: string;
}

export const INVOICE_TITLE_PRESETS_BY_LANG: Record<SupportedInvoiceLanguage, InvoiceTitlePresets> = {
  en: {
    commercial: 'COMMERCIAL INVOICE',
    tax: 'TAX INVOICE',
    proforma: 'PROFORMA INVOICE',
    vat: 'VAT INVOICE',
    gst: 'GST INVOICE',
  },
  nl: {
    commercial: 'HANDELSFACTUUR',
    tax: 'FISCALE FACTUUR',
    proforma: 'PROFORMA FACTUUR',
    vat: 'BTW-FACTUUR',
    gst: 'GST-FACTUUR',
  },
  fr: {
    commercial: 'FACTURE COMMERCIALE',
    tax: 'FACTURE FISCALE',
    proforma: 'FACTURE PROFORMA',
    vat: 'FACTURE AVEC TVA',
    gst: 'FACTURE TPS',
  },
  de: {
    commercial: 'HANDELSRECHNUNG',
    tax: 'STEUERRECHNUNG',
    proforma: 'PROFORMA-RECHNUNG',
    vat: 'MEHRWERTSTEUERRECHNUNG',
    gst: 'GST-RECHNUNG',
  },
  es: {
    commercial: 'FACTURA COMERCIAL',
    tax: 'FACTURA FISCAL',
    proforma: 'FACTURA PROFORMA',
    vat: 'FACTURA CON IVA',
    gst: 'FACTURA GST',
  },
  it: {
    commercial: 'FATTURA COMMERCIALE',
    tax: 'FATTURA FISCALE',
    proforma: 'FATTURA PROFORMA',
    vat: 'FATTURA CON IVA',
    gst: 'FATTURA GST',
  },
  ar: {
    commercial: 'فاتورة تجارية رسمية',
    tax: 'فاتورة ضريبية رسمية',
    proforma: 'فاتورة شكلية مبدئية (بروفورما)',
    vat: 'فاتورة ضريبة القيمة المضافة',
    gst: 'فاتورة ضريبة السلع والخدمات',
  },
  ur: {
    commercial: 'کمرشل ایکسپورٹ انوائس',
    tax: 'سیلز ٹیکس / ایف بی آر انوائس',
    proforma: 'پروفارما انوائس (ابتدائی کوٹیشن)',
    vat: 'ویلیو ایڈڈ ٹیکس (ویٹ) انوائس',
    gst: 'جنرل سیلز ٹیکس (جی ایس ٹی) انوائس',
  },
};

export const DEFAULT_TERMS_BY_LANG: Record<SupportedInvoiceLanguage, string[]> = {
  en: [
    'Direct wire transfers must quote Invoice #{invoiceNumber} on swift remarks.',
    'Inspection certificates must match verified surgical lots prior to cargo departure.',
    'All disputes are subject to Sialkot Chamber of Commerce & Industry (SCCI) arbitration.'
  ],
  nl: [
    'Vermeld bij bankoverschrijving altijd factuurnummer #{invoiceNumber} in de betalingsreferentie.',
    'Inspectiecertificaten dienen vóór vertrek van de vracht overeen te komen met de geverifieerde partij.',
    'Geschillen vallen onder de arbitrage van de Sialkot Chamber of Commerce & Industry (SCCI).'
  ],
  fr: [
    'Tout virement bancaire doit obligatoirement mentionner le N° de facture #{invoiceNumber}.',
    'Les certificats de conformité chirurgicale doivent correspondre aux lots avant expédition.',
    'Tout litige commercial est soumis à l’arbitrage de la Chambre de Commerce et d’Industrie de Sialkot (SCCI).'
  ],
  de: [
    'Bitte geben Sie bei der Überweisung unbedingt die Rechnungsnummer #{invoiceNumber} im Verwendungszweck an.',
    'Prüfzertifikate müssen vor Verladung der Fracht mit den verifizierten Chargen übereinstimmen.',
    'Alle Streitigkeiten unterliegen dem Schiedsverfahren der Industrie- und Handelskammer Sialkot (SCCI).'
  ],
  es: [
    'Las transferencias bancarias deben indicar el N.º de Factura #{invoiceNumber} en el concepto.',
    'Los certificados de inspección deben coincidir con los lotes quirúrgicos antes del despacho.',
    'Cualquier controversia se someterá al arbitraje de la Cámara de Comercio e Industria de Sialkot (SCCI).'
  ],
  it: [
    'I bonifici bancari devono riportare il numero di fattura #{invoiceNumber} nella causale.',
    'I certificati di ispezione chirurgica devono corrispondere ai lotti verificati prima della spedizione.',
    'Eventuali controversie sono soggette all’arbitrato della Camera di Commercio di Sialkot (SCCI).'
  ],
  ar: [
    'يجب ذكر رقم الفاتورة #{invoiceNumber} بوضوح في خانة تفاصيل التحويل البنكي (SWIFT Remarks).',
    'يجب أن تتطابق شهادات الفحص والتعقيم الطبي مع الشحنات قبل مغادرة البضائع للشحن الجوي.',
    'تخضع جميع المعاملات والنزاعات التجارية للتحكيم الرسمي بغرفة تجارة وصناعة سيالكوت (SCCI).'
  ],
  ur: [
    'بینک وائر ٹرانسفر کے وقت سوئفٹ ریمارکس میں انوائس نمبر #{invoiceNumber} لازماً درج کریں۔',
    'سرجیکل و میڈیکل لاٹس کی کوالٹی انسپکشن سرٹیفکیٹ کارگو روانگی سے قبل تصدیق شدہ ہونا ضروری ہے۔',
    'تمام تجارتی تنازعات سیالکوٹ چیمبر آف کامرس اینڈ انڈسٹری (SCCI) کے ثالثی قوانین کے تابع ہیں۔'
  ]
};

