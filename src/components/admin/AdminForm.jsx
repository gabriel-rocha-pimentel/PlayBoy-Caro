import ProductForm from '@/components/forms/ProductForm';
import ArtistForm from '@/components/forms/ArtistForm';

const AdminForm = ({ item, onSave, onCancel }) => {
  const formType = item?.type;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 overflow-y-auto">
      <div className="bg-black/95 border-2 border-red-700 rounded-xl p-6 md:p-8 w-full max-w-lg shadow-2xl my-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-yellow-400">
          {item?.data?.id ? 'Editar' : 'Adicionar Novo'}{' '}
          {formType === 'products' ? 'Produto' : 'Artista'}
        </h2>
        {formType === 'products' ? (
          <ProductForm data={item.data} onSave={onSave} onCancel={onCancel} />
        ) : (
          <ArtistForm data={item.data} onSave={onSave} onCancel={onCancel} />
        )}
      </div>
    </div>
  );
};

export default AdminForm;
