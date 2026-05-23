import type { ProductDetailAttributeDto } from "@/lib/api/products";

type ProductDetailAttributesProps = Readonly<{
  attributes: ProductDetailAttributeDto[];
}>;

export default function ProductDetailAttributes({
  attributes,
}: ProductDetailAttributesProps) {
  const groups = attributes.filter((group) => {
    const label = group.name?.trim() || group.value?.trim() || "";
    return label && (group.attribute?.length ?? 0) > 0;
  });

  if (groups.length === 0) return null;

  return (
    <div className="product-detail-attributes">
      <h3 className="product-detail-attributes-title">Available options</h3>
      <div className="product-detail-attributes-list">
        {groups.map((group) => {
          const label = group.name?.trim() || group.value?.trim() || "Option";
          return (
            <div key={group.id} className="product-detail-attribute-group">
              <span className="product-detail-attribute-label">{label}</span>
              <div className="product-detail-attribute-options">
                {group.attribute.map((opt) => (
                  <span
                    key={opt.id}
                    className="product-detail-attribute-pill"
                  >
                    {opt.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
