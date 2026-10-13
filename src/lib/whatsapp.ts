export function getWhatsAppNumber(): string {
  return process.env.WHATSAPP_NUMBER || '6281234567890';
}

export function formatWhatsAppNumber(number: string): string {
  const cleaned = number.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    return '62' + cleaned.slice(1);
  }
  if (cleaned.startsWith('62')) {
    return cleaned;
  }
  return '62' + cleaned;
}

export function getWhatsAppUrl(productName: string, price: number, quantity: number = 1): string {
  const number = formatWhatsAppNumber(getWhatsAppNumber());
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
  
  const message = `Halo, saya ingin memesan:\n\n*${productName}*\nHarga: ${formattedPrice}\nQuantity: ${quantity}\n\nMohon konfirmasi ketersediaan dan total harga. Terima kasih!`;
  
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppDirectUrl(message: string): string {
  const number = formatWhatsAppNumber(getWhatsAppNumber());
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}