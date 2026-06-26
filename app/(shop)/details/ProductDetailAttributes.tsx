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
      <dl className="product-detail-attributes-list">
        {groups.map((group) => {
          const label = group.name?.trim() || group.value?.trim() || "Option";
          return (
            <div key={group.id} className="product-detail-attribute-row">
              <dt className="product-detail-attribute-label">{label}</dt>
              <dd className="product-detail-attribute-values">
                {group.attribute.map((opt) => (
                  <span
                    key={opt.id}
                    className="product-detail-attribute-pill"
                  >
                    {opt.name}
                  </span>
                ))}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
