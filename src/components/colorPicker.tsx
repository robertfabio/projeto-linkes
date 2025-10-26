// BetterColorPicker.tsx
import React, { useState, useRef, useEffect } from 'react';
import { SketchPicker, type ColorResult } from 'react-color';

// Definindo as props que nosso componente vai aceitar
interface BetterColorPickerProps {
  initialColor?: string;
  onChange: (color: string) => void;
}

const BetterColorPicker: React.FC<BetterColorPickerProps> = ({ 
  initialColor = '#ffffff', 
  onChange 
}) => {
  const [color, setColor] = useState(initialColor);
  const [showPicker, setShowPicker] = useState(false);

  // Ref para o 'popup' do picker
  const pickerRef = useRef<HTMLDivElement>(null);

  // --- Lógica para fechar ao clicar fora ---
  useEffect(() => {
    // Função que será chamada no clique
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false); // Fecha o picker
      }
    }
    // Adiciona o 'listener' no documento
    document.addEventListener('mousedown', handleClickOutside);
    // Remove o 'listener' quando o componente for "desmontado"
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [pickerRef]); // Dependência do useEffect
  // --- Fim da lógica ---


  // Função chamada quando a cor muda no 'SketchPicker'
  const handleChangeComplete = (colorResult: ColorResult) => {
    const newColor = colorResult.hex;
    setColor(newColor); // Atualiza o estado interno
    onChange(newColor); // Notifica o componente-pai
  };

  // Estilos para o 'swatch' (o botão que mostra a cor)
  // (Usando style inline para ser mais fácil de copiar, mas você pode usar Tailwind)
  const swatchStyle: React.CSSProperties = {
    width: '70px',
    height: '50px',
    backgroundColor: color,
    border: '1px solid #ccc',
    borderRadius: '8px',
    cursor: 'pointer',
  };

  // Estilos para posicionar o 'picker' (o popup)
  const popoverStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 2,
    marginTop: '5px',
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* 1. O "Botão" que mostra a cor atual e abre o picker */}
      <div 
        style={swatchStyle} 
        onClick={() => setShowPicker(!showPicker)} 
      />

      {/* 2. O Picker, que só aparece se 'showPicker' for true */}
      {showPicker && (
        <div style={popoverStyle} ref={pickerRef}>
          <SketchPicker
            color={color}
            onChangeComplete={handleChangeComplete}
            // Você pode desativar o Alpha (transparência) se não precisar
            // disableAlpha={true} 
          />
        </div>
      )}
    </div>
  );
};

export default BetterColorPicker;