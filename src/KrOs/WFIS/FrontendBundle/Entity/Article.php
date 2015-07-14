<?php
namespace KrOs\WFIS\FrontendBundle\Entity;

use Gedmo\Mapping\Annotation as Gedmo;
use Doctrine\ORM\Mapping as ORM;

/**
 * KrOs\WFIS\FrontendBundle\Entity\Article
 *
 * @ORM\Entity()
 * @ORM\Table()
 */
class Article
{
 /**
  * @var integer $id
  *
  * @ORM\Column(name="id", type="integer")
  * @ORM\Id
  * @ORM\GeneratedValue(strategy="AUTO")
  */
    protected $id;
  
  /**
    * @var datetime $created
    *
    * @Gedmo\Timestampable(on="create")
    * @ORM\Column(type="datetime", nullable=true)
    */
    protected $created_at;
  
  /**
    * @var datetime updated
    *
    * @Gedmo\Timestampable(on="update")
    * @ORM\Column(type="datetime", nullable=true)
    */
    protected $updated_at;
  
  /**
   * @var string $title
   *
   * @ORM\Column(type="string", length=255, name="title")
   *
   */
    protected $title;
  
  /**
   * @var string icon_class
   *
   * @ORM\Column(type="string", length=20, name="icon_class",nullable=true)
   *
   */
    protected $icon_class;
  
  /**
   * @var string $content
   *
   * @ORM\Column(type="text", nullable=true)
   */
    protected $content;
  
   /**
     * @Gedmo\Slug(fields={"title"})
     * @ORM\Column(length=128, unique=true)
     */
    protected $slug;
  
    public function getId()
    {
        return $this->id;
    }
    public function getCreatedAt()
    {
        return $this->created_at;
    }
    public function setCreatedAt()
    {
        return $this->updated_at;
    }
  
    public function getTitle()
    {
        return $this->title;
    }
    public function setTitle($newVar)
    {
        $this->title = $newVar;
    }
    public function getContent()
    {
        return $this->content;
    }
    public function setContent($newVar)
    {
        $this->content = $newVar;
    }
    public function getSlug()
    {
        return $this->slug;
    }
    public function getIconClass()
    {
        return $this->icon_class;
    }
    public function setIconClass($newVar)
    {
        $this->icon_class = $newVar;
    }
}
